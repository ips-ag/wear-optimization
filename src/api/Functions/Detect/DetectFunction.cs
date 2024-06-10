using System.Net;
using Api.Azure.AI.Vision;
using Api.Azure.Storage;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Api.Functions.Detect;

public class DetectFunction
{
    private readonly AzureStorageClient _storageClient;
    private readonly AzureAiVisionClient _visionClient;

    public DetectFunction(AzureStorageClient storageClient, AzureAiVisionClient visionClient)
    {
        _storageClient = storageClient;
        _visionClient = visionClient;
    }

    [Function("Detect")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")]
        HttpRequestData req,
        CancellationToken cancel)
    {
        var result = await ReadContentAsync(req, cancel);
        var uri = await _storageClient.UploadAsync(result.Content, result.Extension, cancel);
        string? analysisResult = await _visionClient.AnalyzeImageAsync(uri, cancel);
        if (analysisResult is null)
        {
            return req.CreateResponse(HttpStatusCode.InternalServerError);
        }
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteStringAsync(analysisResult, cancel);
        return response;
    }

    private async Task<(BinaryData Content, string Extension)> ReadContentAsync(
        HttpRequestData req,
        CancellationToken cancel)
    {
        string extension = GetExtension(req);
        var buffer = await BinaryData.FromStreamAsync(req.Body, cancel);
        return (buffer, extension);
    }

    private static string GetExtension(HttpRequestData req)
    {
        if (!req.Headers.TryGetValues("Content-Type", out var values)) return "jpg";
        values = values.ToList();
        if (!values.Any()) return "jpg";
        return values.First().Split('/').Last();
    }
}
