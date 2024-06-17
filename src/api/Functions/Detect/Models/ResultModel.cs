using System.Text.Json.Serialization;

namespace Api.Functions.Detect.Models;

public class ResultModel
{
    [JsonPropertyName("imageName")]
    [JsonRequired]
    public required string ImageName { get; set; }

    [JsonPropertyName("wearCode")]
    [JsonRequired]
    public required WearCode? WearCode { get; set; }

    [JsonPropertyName("wearConfidence")]
    [JsonRequired]
    public required double? WearConfidence { get; set; }

    [JsonPropertyName("wearCause")]
    [JsonRequired]
    public required string WearCause { get; set; }

    [JsonPropertyName("suggestedActions")]
    [JsonRequired]
    public required List<string> SuggestedActions { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
