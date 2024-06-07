using System.Text.Json.Serialization;

namespace Api.Azure.AI.Vision.Models
{
    public class RequestModel
    {
        [JsonPropertyName("url")]
        public required string Url { get; set; }
    }
}