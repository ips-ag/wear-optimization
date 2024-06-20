using System.Text.Json.Serialization;
using Azure;
using Azure.Data.Tables;

namespace Api.Azure.Storage.Models;

public class ImageAnalysisModel : ITableEntity
{
    [JsonPropertyName("ImageName")]
    [JsonRequired]
    public required string ImageName { get; set; }

    [JsonPropertyName("errorCode")]
    public string? ErrorCode { get; set; }
    
    [JsonPropertyName("errorMessage")]
    public string? ErrorMessage { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    [JsonPropertyName("DetectedWearCode")]
    public WearCodeModel? DetectedWearCode { get; set; }

    [JsonPropertyName("DetectedWearConfidence")]
    public double? DetectedWearConfidence { get; set; }

    public required string PartitionKey { get; set; }
    public required string RowKey { get; set; }

    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
