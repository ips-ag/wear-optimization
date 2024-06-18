using System.Net;
using Api.Azure.Storage;
using Api.Functions.Detect.Models;
using Api.Functions.Feedback.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions.Feedback;

public class FeedbackFunction
{
    private readonly ILogger<FeedbackFunction> _logger;
    private readonly AzureStorageClient _storageClient;

    public FeedbackFunction(AzureStorageClient storageClient, ILogger<FeedbackFunction> logger)
    {
        _storageClient = storageClient;
        _logger = logger;
    }

    [Function("Feedback")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req,
        CancellationToken cancel)
    {
        HttpResponseData? response;
        try
        {
            var requestModel = await req.ReadFromJsonAsync<FeedbackRequestModel>(cancel);
            var responseModel = new FeedbackResponseModel();
            if (requestModel is null)
            {
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                responseModel.Error = new ErrorModel { Code = "403", Message = "Unable to deserialize request" };
                await response.WriteAsJsonAsync(responseModel, cancel);
                return response;
            }
            if (!await _storageClient.ExistsAsync(requestModel.ImageName, cancel))
            {
                response = req.CreateResponse(HttpStatusCode.NotFound);
                responseModel.Error = new ErrorModel { Code = "404", Message = "Image not found" };
                await response.WriteAsJsonAsync(responseModel, cancel);
                return response;
            }
            await _storageClient.CreateFeedbackAsync(requestModel, cancel);
            response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(responseModel, cancel);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error processing feedback request");
            response = req.CreateResponse(HttpStatusCode.InternalServerError);
            var result = new FeedbackResponseModel { Error = new ErrorModel { Code = "500", Message = e.Message } };
            await response.WriteAsJsonAsync(result, cancel);
            return response;
        }
        return response;
    }
}
