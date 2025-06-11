using System.Text.Json;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Converters;
using Api.Azure.AI.Vision.Models;
using Api.Functions.Detect.Models;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction.Models;
using Microsoft.Extensions.Options;
using ErrorModel = Api.Functions.Detect.Models.ErrorModel;

namespace Api.Azure.AI.Vision;
public class AzureAiCustomVisionClient
{
    private readonly IOptionsMonitor<AzureAiCustomVisionSettings> _options;
   
    private readonly DetectConverter _converter;
    private readonly CustomVisionPredictionClient _customVisionPredictionClient;

    public AzureAiCustomVisionClient(IOptionsMonitor<AzureAiCustomVisionSettings> options,
        DetectConverter converter)
    {
        _options = options;
        _customVisionPredictionClient = AuthenticatePrediction();
        _converter = converter;
    }


    private CustomVisionPredictionClient AuthenticatePrediction()
    {
        var settings = _options.CurrentValue;

        CustomVisionPredictionClient predictionApi = new CustomVisionPredictionClient(new ApiKeyServiceClientCredentials(settings.Key))
        {
            Endpoint = settings.Endpoint
        };
        return predictionApi;

    }

    public async Task<DetectResponseModel> ClassifyImageAsync(string imageName, BinaryData imageData, CancellationToken cancellationToken)
    {
        var settings = _options.CurrentValue;
        try
        {
            
            var result = await _customVisionPredictionClient.ClassifyImageAsync(settings.ProjectId, settings.ModelName, imageData.ToStream(), null, cancellationToken);
            return _converter.Convert(imageName, result);
        }
        catch (CustomVisionErrorException e)
        {
            var response = new DetectResponseModel { ImageName = imageName };
           
            var error = JsonSerializer.Deserialize<ErrorResponseModel>(e.Response.Content);
            if (error is not null)
            {
                response.Error = new ErrorModel { Code = error!.Error!.Code, Message = error.Error.Message };
                return response;
            }

            throw;
           
        }
        

        // Loop over each prediction and write out the results
        //foreach (var c in result.Predictions)
        //{
        //    Console.WriteLine($"\t{c.TagName}: {c.Probability:P1}");
        //}
    }
}
