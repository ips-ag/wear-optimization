using System.Diagnostics.CodeAnalysis;
using Api.Azure.AI.Vision.Models;
using Api.Functions.Detect.Models;
using ErrorModel = Api.Functions.Detect.Models.ErrorModel;

namespace Api.Azure.AI.Vision.Converters;

public class DetectConverter
{
    [return: NotNullIfNotNull(nameof(model))]
    public DetectResponseModel? Convert(ResponseModel? model)
    {
        if (model is null) return null;
        var response = new DetectResponseModel();
        if (model.Error is not null)
        {
            response.Error = new ErrorModel { Code = model.Error.Code, Message = model.Error.Message };
        }
        if (model.CustomModelResult?.TagsResult?.Values.Count > 0)
        {
            var tagModel = model.CustomModelResult.TagsResult.Values.OrderByDescending(v => v.Confidence).First();
            response.Result =
                new ResultModel { WearCode = Convert(tagModel.Name), WearConfidence = tagModel.Confidence };
        }
        return response;
    }

    private DetectedWearCodeModel Convert(string model)
    {
        return model.ToLowerInvariant() switch
        {
            "plastic deformation" => DetectedWearCodeModel.PlasticDeformation,
            "thermal cracking" => DetectedWearCodeModel.ThermalCracking,
            "notch wear" => DetectedWearCodeModel.NotchWear,
            "crater wear" => DetectedWearCodeModel.CraterWear,
            "build-up on the cutting edge" => DetectedWearCodeModel.BuildupOnCuttingEdge,
            "fractures" => DetectedWearCodeModel.Fractures,
            "mould edge wear" => DetectedWearCodeModel.MouldEdgeWear,
            "flank face wear" => DetectedWearCodeModel.FlankFaceWear,
            "galling" => DetectedWearCodeModel.Galling,
            _ => throw new ArgumentOutOfRangeException(nameof(model), model, $"Unknown wear code {model}")
        };
    }
}
