using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class ObjectsResultModel
{
    [JsonPropertyName("values")]
    [JsonRequired]
    public required List<DetectedObjectModel> Values { get; set; }
}