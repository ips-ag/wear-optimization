using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class CustomModelResultModel
{
    [JsonPropertyName("tagsResult")]
    public TagsResultModel? TagsResult { get; set; }

    [JsonPropertyName("objectsResult")]
    public ObjectsResultModel? ObjectsResult { get; set; }
}
