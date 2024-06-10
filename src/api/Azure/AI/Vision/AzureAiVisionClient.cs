using System.Net.Http.Json;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Models;
using Microsoft.Extensions.Options;

namespace Api.Azure.AI.Vision;

public class AzureAiVisionClient
{
    private readonly IOptionsMonitor<AzureAiVisionSettings> _options;
    private readonly HttpClient _client;

    public AzureAiVisionClient(IOptionsMonitor<AzureAiVisionSettings> options, HttpClient client)
    {
        _options = options;
        _client = client;
    }

    public async Task<ResponseModel?> AnalyzeImageAsync(Uri uri, CancellationToken cancel)
    {
        var settings = _options.CurrentValue;
        UriBuilder uriBuilder = new(settings.Endpoint)
        {
            Path = "/computervision/imageanalysis:analyze",
            Query = $"model-name={settings.ModelName}&api-version={settings.ApiVersion}"
        };
        RequestModel requestModel = new() { Url = uri.OriginalString };
        var requestContent = JsonContent.Create(requestModel);
        await requestContent.LoadIntoBufferAsync();
        var response = await _client.PostAsync(uriBuilder.Uri, requestContent, cancel);
        return await response.Content.ReadFromJsonAsync<ResponseModel>(cancel);
    }
}
