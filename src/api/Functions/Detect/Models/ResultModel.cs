using System.Text.Json.Serialization;

namespace Api.Functions.Detect.Models;

public class ResultModel
{
    [JsonPropertyName("wearCode")]
    [JsonRequired]
    public required DetectedWearCodeModel? WearCode { get; set; }

    [JsonPropertyName("wearConfidence")]
    [JsonRequired]
    public required double? WearConfidence { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}