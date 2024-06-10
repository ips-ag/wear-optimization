using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models;

public class BoundingBoxModel
{
    [JsonPropertyName("x")]
    [JsonRequired]
    public double X { get; set; }

    [JsonPropertyName("y")]
    [JsonRequired]
    public double Y { get; set; }

    [JsonPropertyName("w")]
    [JsonRequired]
    public double W { get; set; }

    [JsonPropertyName("h")]
    [JsonRequired]
    public double H { get; set; }
}