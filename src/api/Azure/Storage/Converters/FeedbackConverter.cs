using System.Diagnostics.CodeAnalysis;
using Api.Azure.Storage.Models;
using Api.Functions.Detect.Models;
using Api.Functions.Feedback.Models;

namespace Api.Azure.Storage.Converters;

public class FeedbackConverter
{
    public FeedbackModel Convert(FeedbackRequestModel request)
    {
        return new FeedbackModel
        {
            PartitionKey = request.ImageName, // TODO: Replace with user identifier
            RowKey = request.ImageName,
            ResultAccepted = request.ResultAccepted,
            ResultWearCode = Convert(request.ResultWearCode).Value,
            UserWearCode = Convert(request.UserWearCode),
            UserComment = request.UserComment
        };
    }

    [return: NotNullIfNotNull(nameof(wearCode))]
    private WearCodeModel? Convert(WearCode? wearCode)
    {
        if (wearCode is null) return null;
        return wearCode switch
        {
            WearCode.None => WearCodeModel.None,
            WearCode.BuildupOnCuttingEdge => WearCodeModel.BuildupOnCuttingEdge,
            WearCode.FlankFaceWear => WearCodeModel.FlankFaceWear,
            WearCode.CraterWear => WearCodeModel.CraterWear,
            WearCode.Fractures => WearCodeModel.Fractures,
            WearCode.PlasticDeformation => WearCodeModel.PlasticDeformation,
            WearCode.NotchWear => WearCodeModel.NotchWear,
            WearCode.ThermalCracking => WearCodeModel.ThermalCracking,
            WearCode.Galling => WearCodeModel.Galling,
            WearCode.MouldEdgeWear => WearCodeModel.MouldEdgeWear,
            _ => throw new ArgumentOutOfRangeException(nameof(wearCode), wearCode, "Unknown wear code")
        };
    }
}
