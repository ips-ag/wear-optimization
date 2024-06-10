using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class TagsResultModel
{
    [JsonPropertyName("values")]
    [JsonRequired]
    public required List<TagModel> Values { get; set; }
}
