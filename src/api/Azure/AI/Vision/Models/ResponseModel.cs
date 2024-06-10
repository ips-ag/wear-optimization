using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class ResponseModel
{
    [JsonPropertyName("customModelResult")]
    public CustomModelResultModel? CustomModelResult { get; set; }

    [JsonPropertyName("modelVersion")]
    public string? ModelVersion { get; set; }

    [JsonPropertyName("metadata")]
    public MetadataModel? Metadata { get; set; }
    
    [JsonPropertyName("kind")]
    public string? Kind { get; set; }

    [JsonPropertyName("error")]
    public ErrorModel? Error { get; set; }
}
