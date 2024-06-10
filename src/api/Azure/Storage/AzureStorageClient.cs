using Api.Azure.Storage.Configuration;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;

namespace Api.Azure.Storage;

public class AzureStorageClient
{
    private readonly IOptionsMonitor<AzureStorageSettings> _options;

    public AzureStorageClient(IOptionsMonitor<AzureStorageSettings> options)
    {
        _options = options;
    }

    public async Task<Uri> UploadAsync(BinaryData content, string extension, CancellationToken cancel)
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
        var blobContentInfo = await blobClient.UploadAsync(content, overwrite: true, cancel);
        if (!blobContentInfo.HasValue) throw new IOException($"Unable to upload image to blob {blobName}");
        var sasBuilder = new BlobSasBuilder(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddHours(6))
        {
            BlobContainerName = settings.ContainerName, BlobName = blobName, Resource = "b"
        };
        var sasUri = blobClient.GenerateSasUri(sasBuilder);
        return sasUri;
    }
}
