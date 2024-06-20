using System.Text.Json.Serialization;
using Azure;
using Azure.Data.Tables;

namespace Api.Azure.Storage.Models;

public class FeedbackUpdateModel : ITableEntity
{
    [JsonPropertyName("DetectedWearAccepted")]
    [JsonRequired]
    public required bool DetectedWearAccepted { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    [JsonPropertyName("UserWearCode")]
    public WearCodeModel? UserWearCode { get; set; }

    [JsonPropertyName("UserComment")]
    public string? UserComment { get; set; }

    public required string PartitionKey { get; set; }
    public required string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}