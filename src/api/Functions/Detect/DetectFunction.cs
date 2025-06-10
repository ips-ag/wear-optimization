using System.Net;
using Api.Azure.Storage;
using Api.Functions.Detect.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Api.Azure.AI.Vision;

namespace Api.Functions.Detect;

public class DetectFunction
{
    private readonly ILogger<DetectFunction> _logger;
    private readonly AzureStorageClient _storageClient;
    private readonly MockAnalysisGenerator _mockGenerator;
    private readonly AzureAiCustomVisionClient _customVisionClient;

    public DetectFunction(
        AzureStorageClient storageClient,
        ILogger<DetectFunction> logger,
        AzureAiCustomVisionClient customVisionClient)
    {
        _storageClient = storageClient;
        _logger = logger;
        _mockGenerator = new MockAnalysisGenerator(logger);
        _customVisionClient = customVisionClient;
    }

    [Function("Detect")]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")]
        HttpRequestData req,
        CancellationToken cancel)
    {
        HttpResponseData? response;
        string? imageName = null;
        try
        {
            var result = await ReadContentAsync(req, cancel);
            imageName = await _storageClient.UploadAsync(result.Content, result.Extension, cancel);

            
            //var analysisResult = _mockGenerator.GenerateAnalysis(imageName);
            var analysisResult = await _customVisionClient.ClassifyImageAsync(imageName, result.Content, cancel);
            await _storageClient.CreateAnalysisResultAsync(analysisResult, cancel);

            response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(analysisResult, cancel);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error processing request");
            response = req.CreateResponse(HttpStatusCode.InternalServerError);
            var errorResult = new DetectResponseModel { Error = new ErrorModel { Code = "500", Message = e.Message } };
            await response.WriteAsJsonAsync(errorResult, cancel);
            if (imageName is not null) await _storageClient.MarkAsInvalidAsync(imageName, cancel);
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

public class MockAnalysisGenerator
{
    private readonly ILogger _logger;
    private readonly Random _random = new();
    private readonly Dictionary<string, dynamic> _wearData;
    private readonly Dictionary<string, string> _wearCodeMapping;

    public MockAnalysisGenerator(ILogger logger)
    {
        _logger = logger;
        _wearCodeMapping = CreateWearCodeMapping();
        _wearData = LoadWearData();
    }

    public DetectResponseModel GenerateAnalysis(string imageName)
    {
        var solutionKeys = GetSolutionKeys();
        var solutionKey = solutionKeys[_random.Next(solutionKeys.Count)];
        _logger.LogInformation("Selected solution key: {SolutionKey}", solutionKey);

        var selectedWearType = GetWearType(solutionKey);
        var mappedWearCode = _wearCodeMapping[selectedWearType];
        var wearData = _wearData[selectedWearType];
        var solutionSteps = GetSolutionSteps(solutionKey);

        var result = CreateResponse(imageName, mappedWearCode, wearData, solutionSteps);
        return result;
    }

    private Dictionary<string, string> CreateWearCodeMapping() => new()
    {
        {"buildUp", "buildupOnCuttingEdge"},
        {"flankFaceWear", "flankFaceWear"},
        {"craterWear", "craterWear"},
        {"fractures", "fractures"},
        {"plasticDeformation", "plasticDeformation"},
        {"notchWear", "notchWear"},
        {"thermalCracking", "thermalCracking"},
        {"galling", "galling"},
        {"mouldEdgeWear", "mouldEdgeWear"}
    };

    private Dictionary<string, dynamic> LoadWearData()
    {
        var jsonPath = Path.Combine(AppContext.BaseDirectory, "Functions", "Detect", "Data", "data.json");
        var jsonContent = File.ReadAllText(jsonPath);
        return JsonSerializer.Deserialize<Dictionary<string, dynamic>>(jsonContent)!;
    }

    private List<string> GetSolutionKeys() => _wearData.Keys
        .Where(k => _wearData[k] is JsonElement element && element.TryGetProperty("solutionSteps", out _))
        .ToList();

    private string GetWearType(string solutionKey)
    {
        var wearType = _wearCodeMapping.Keys
            .FirstOrDefault(w => solutionKey.EndsWith(w, StringComparison.OrdinalIgnoreCase));

        return wearType ?? "flankFaceWear";
    }

    private List<string> GetSolutionSteps(string solutionKey) =>
        ((JsonElement)_wearData[solutionKey])
            .GetProperty("solutionSteps")
            .Deserialize<List<string>>()!;

    private DetectResponseModel CreateResponse(string imageName, string mappedWearCode, dynamic wearData, List<string> solutionSteps) =>
        new()
        {
            Result = new ResultModel
            {
                ImageName = imageName,
                WearCode = Enum.Parse<WearCode>(mappedWearCode, true),
                WearConfidence = Math.Round(_random.NextDouble() * 0.3 + 0.7, 2),
                WearCause = ((JsonElement)wearData).GetProperty("reason").GetString()!,
                SuggestedActions = solutionSteps,
                Description = ((JsonElement)wearData).GetProperty("detailReason").GetString()
            }
        };
}
