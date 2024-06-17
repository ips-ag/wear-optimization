using Api.Azure.Storage.Configuration;
using Api.Azure.Storage.Converters;
using Api.Functions.Feedback.Models;
using Azure.Data.Tables;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;

namespace Api.Azure.Storage;

public class AzureStorageClient
{
    private readonly IOptionsMonitor<AzureStorageSettings> _options;
    private readonly FeedbackConverter _feedbackConverter;

    public AzureStorageClient(IOptionsMonitor<AzureStorageSettings> options, FeedbackConverter feedbackConverter)
    {
        _options = options;
        _feedbackConverter = feedbackConverter;
    }

    /// <summary>
    ///     Uploads binary data to Azure Blob Storage
    /// </summary>
    /// <param name="content">Binary data to upload</param>
    /// <param name="extension">Blob extension</param>
    /// <param name="cancel">Cancellation token</param>
    /// <returns>Blob identifier of uploaded data</returns>
    /// <exception cref="IOException">Thrown in case of upload failure</exception>
    public async Task<string> UploadAsync(BinaryData content, string extension, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        var blobName = $"{Guid.NewGuid():D}.{extension}";
        var containerClient = new BlobContainerClient(settings.ConnectionString, settings.ContainerName);
        if (!await containerClient.ExistsAsync(cancel))
        {
            var containerInfo = await containerClient.CreateIfNotExistsAsync(cancellationToken: cancel);
            if (!containerInfo.HasValue) throw new IOException($"Unable to create container {settings.ContainerName}");
        }
        var blobClient = new BlobClient(settings.ConnectionString, settings.ContainerName, blobName);
        var uploadOptions = new BlobUploadOptions
        {
            HttpHeaders = new BlobHttpHeaders { ContentType = $"image/{extension}" }
        };
        var blobContentInfo = await blobClient.UploadAsync(
            content: content,
            options: uploadOptions,
            cancellationToken: cancel);
        if (!blobContentInfo.HasValue) throw new IOException($"Unable to upload image to blob {blobName}");
        return blobName;
    }

    /// <summary>
    ///     Get publicly available URI of the blob
    /// </summary>
    /// <param name="blobName">Blob name</param>
    /// <returns>Publicly available URI of the blob</returns>
    public Uri GetBlobUri(string blobName)
    {
        var settings = _options.CurrentValue;
        var blobClient = new BlobClient(settings.ConnectionString, settings.ContainerName, blobName);
        var sasBuilder = new BlobSasBuilder(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddHours(6))
        {
            BlobContainerName = settings.ContainerName, BlobName = blobName, Resource = "b"
        };
        var uri = blobClient.GenerateSasUri(sasBuilder);
        return uri;
    }

    /// <summary>
    ///     Checks if the blob exists
    /// </summary>
    /// <param name="blobName">Blob identifier</param>
    /// <param name="cancel">Cancellation token</param>
    /// <returns></returns>
    public async Task<bool> ExistsProcessedAsync(string blobName, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        var blobClient = new BlobClient(settings.ConnectionString, settings.ContainerName, $"Processed/{blobName}");
        return await blobClient.ExistsAsync(cancel);
    }

    /// <summary>
    ///     Moves blob to Invalid directory
    /// </summary>
    /// <param name="blobName">Blob name</param>
    /// <param name="cancel">Cancellation token</param>
    public async Task MarkAsInvalidAsync(string blobName, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        var sourceBlob = new BlobClient(settings.ConnectionString, settings.ContainerName, blobName);
        var targetBlob = new BlobClient(settings.ConnectionString, settings.ContainerName, $"Invalid/{blobName}");
        var sourceBlobUri = GetBlobUri(blobName);
        await targetBlob.SyncCopyFromUriAsync(sourceBlobUri, cancellationToken: cancel);
        await sourceBlob.DeleteIfExistsAsync(cancellationToken: cancel);
    }

    /// <summary>
    ///     Moves blob to Processed directory
    /// </summary>
    /// <param name="blobName">Blob name</param>
    /// <param name="cancel">Cancellation token</param>
    public async Task MarkAsProcessedAsync(string blobName, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        var sourceBlob = new BlobClient(settings.ConnectionString, settings.ContainerName, blobName);
        var targetBlob = new BlobClient(settings.ConnectionString, settings.ContainerName, $"Processed/{blobName}");
        var sourceBlobUri = GetBlobUri(blobName);
        await targetBlob.SyncCopyFromUriAsync(sourceBlobUri, cancellationToken: cancel);
        await sourceBlob.DeleteIfExistsAsync(cancellationToken: cancel);
    }

    /// <summary>
    ///     Creates feedback entity in Azure Table Storage
    /// </summary>
    /// <param name="feedback">Feedback request</param>
    /// <param name="cancel">Cancellation token</param>
    public async Task CreateFeedbackAsync(FeedbackRequestModel feedback, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        var feedbackModel = _feedbackConverter.Convert(feedback);
        var tableClient = new TableClient(settings.ConnectionString, settings.FeedbackTableName);
        await tableClient.CreateIfNotExistsAsync(cancel);
        await tableClient.DeleteEntityAsync(
            feedbackModel.PartitionKey,
            feedbackModel.RowKey,
            cancellationToken: cancel);
        await tableClient.AddEntityAsync(feedbackModel, cancel);
    }
}
