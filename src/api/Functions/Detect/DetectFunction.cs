using System.Net;
using Api.Azure.AI.Vision;
using Api.Azure.Storage;
using Api.Functions.Detect.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Api.Functions.Detect;

public class DetectFunction
{
    private readonly ILogger<DetectFunction> _logger;
    private readonly AzureStorageClient _storageClient;
    private readonly AzureAiVisionClient _visionClient;

    public DetectFunction(
        AzureStorageClient storageClient,
        AzureAiVisionClient visionClient,
        ILogger<DetectFunction> logger)
    {
        _storageClient = storageClient;
        _visionClient = visionClient;
        _logger = logger;
    }

    [Function("Detect")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")]
        HttpRequestData req,
        CancellationToken cancel)
    {
        HttpResponseData? response;
        try
        {
            var result = await ReadContentAsync(req, cancel);
            var uri = await _storageClient.UploadAsync(result.Content, result.Extension, cancel);
            var analysisResult = await _visionClient.AnalyzeImageAsync(uri, cancel);
            if (analysisResult is null)
            {
                response = req.CreateResponse(HttpStatusCode.InternalServerError);
                var errorResult = new DetectResponseModel
                {
                    Error = new ErrorModel { Code = "500", Message = "Missing image analysis result" }
                };
                await response.WriteAsJsonAsync(errorResult, cancel);
                return response;
            }
            response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(analysisResult, cancel);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error processing request");
            response = req.CreateResponse(HttpStatusCode.InternalServerError);
            var errorResult = new DetectResponseModel { Error = new ErrorModel { Code = "500", Message = e.Message } };
            await response.WriteAsJsonAsync(errorResult, cancel);
            return response;
        }
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
