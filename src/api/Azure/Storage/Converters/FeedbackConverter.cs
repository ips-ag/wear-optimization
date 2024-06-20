using Api.Azure.Storage.Models;
using Api.Functions.Feedback.Models;

namespace Api.Azure.Storage.Converters;

public class FeedbackConverter
{
    private readonly WearCodeConverter _wearCodeConverter;

    public FeedbackConverter(WearCodeConverter wearCodeConverter)
    {
        _wearCodeConverter = wearCodeConverter;
    }

    public FeedbackUpdateModel Convert(FeedbackRequestModel request)
    {
        return new FeedbackUpdateModel
        {
            PartitionKey = request.ImageName, // TODO: Replace with user identifier
            RowKey = request.ImageName,
            DetectedWearAccepted = request.DetectedWearAccepted,
            UserWearCode = _wearCodeConverter.Convert(request.UserWearCode),
            UserComment = request.UserComment
        };
    }
}
