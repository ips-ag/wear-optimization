using System.Text.Json.Serialization;

namespace Api.Functions.Detect.Models;

public class DetectResponseModel
{
    [JsonPropertyName("imageName")]
    [JsonIgnore]
    public string? ImageName { get; set; }

    [JsonPropertyName("error")]
    public ErrorModel? Error { get; set; }

    [JsonPropertyName("result")]
    public ResultModel? Result { get; set; }
}
