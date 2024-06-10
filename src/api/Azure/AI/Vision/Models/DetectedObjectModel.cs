using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class DetectedObjectModel
{
    [JsonPropertyName("id")]
    [JsonRequired]
    public required string Id { get; set; }

    [JsonPropertyName("boundingBox")]
    public BoundingBoxModel? BoundingBox { get; set; }

    [JsonPropertyName("tags")]
    public List<TagModel>? Tags { get; set; }
}