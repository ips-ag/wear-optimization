using System.Text.Json.Serialization;

namespace Api.Functions.Detect.Models;

public class ErrorModel
{
    [JsonPropertyName("code")]
    [JsonRequired]
    public required string Code { get; set; }

    [JsonPropertyName("message")]
    [JsonRequired]
    public required string Message { get; set; }
}
