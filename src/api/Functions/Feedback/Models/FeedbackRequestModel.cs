using System.Text.Json.Serialization;
using Api.Functions.Detect.Models;

namespace Api.Functions.Feedback.Models;

public class FeedbackRequestModel
{
    [JsonPropertyName("imageName")]
    [JsonRequired]
    public required string ImageName { get; set; }

    /// <summary>
    ///     Indicator whether wear code detected by the optimization app was accepted by the user
    /// </summary>
    [JsonPropertyName("resultAccepted")]
    [JsonRequired]
    public required bool ResultAccepted { get; set; }

    /// <summary>
    ///     Wear code detected by the optimization app
    /// </summary>
    [JsonPropertyName("resultWearCode")]
    [JsonRequired]
    public required WearCode ResultWearCode { get; set; }

    /// <summary>
    ///     Wear code reported by user. Required if <see cref="ResultAccepted" /> is false
    /// </summary>
    [JsonPropertyName("userWearCode")]
    public WearCode? UserWearCode { get; set; }

    /// <summary>
    ///     Optional comment provided by the user
    /// </summary>
    [JsonPropertyName("userComment")]
    public string? UserComment { get; set; }
}
