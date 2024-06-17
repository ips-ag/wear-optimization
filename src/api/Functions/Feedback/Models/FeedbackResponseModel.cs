using System.Text.Json.Serialization;
using Api.Functions.Detect.Models;

namespace Api.Functions.Feedback.Models;

public class FeedbackResponseModel
{
    [JsonPropertyName("error")]
    public ErrorModel? Error { get; set; }
}
