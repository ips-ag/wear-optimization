using Api.Azure.Storage.Models;
using Api.Functions.Detect.Models;

namespace Api.Azure.Storage.Converters;

public class ImageAnalysisConverter
{
    private readonly WearCodeConverter _wearCodeConverter;

    public ImageAnalysisConverter(WearCodeConverter wearCodeConverter)
    {
        _wearCodeConverter = wearCodeConverter;
    }

    public ImageAnalysisModel? Convert(DetectResponseModel response)
    {
        string? imageName = response.ImageName;
        if (imageName is null) return null; // no analysis happened
        return new ImageAnalysisModel
        {
            PartitionKey = imageName, // TODO: Replace with user identifier
            RowKey = imageName,
            ImageName = imageName,
            DetectedWearCode = _wearCodeConverter.Convert(response.Result?.WearCode),
            DetectedWearConfidence = response.Result?.WearConfidence,
            ErrorCode = response.Error?.Code,
            ErrorMessage = response.Error?.Message
        };
    }
}
