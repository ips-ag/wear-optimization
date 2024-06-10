using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class TagModel
{
    [JsonPropertyName("name")]
    [JsonRequired]
    public required string Name { get; set; }

    [JsonPropertyName("confidence")]
    [JsonRequired]
    public required double Confidence { get; set; }
}