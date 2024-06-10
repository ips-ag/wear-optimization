using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class MetadataModel
{
    [JsonPropertyName("width")]
    [JsonRequired]
    public required int Width { get; set; }

    [JsonPropertyName("height")]
    [JsonRequired]
    public required int Height { get; set; }
}