using System.Net.Http.Json;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Converters;
using Api.Azure.AI.Vision.Models;
using Api.Functions.Detect.Models;
using Microsoft.Extensions.Options;

namespace Api.Azure.AI.Vision;

public class AzureAiVisionClient
{
    private readonly IOptionsMonitor<AzureAiVisionSettings> _options;
    private readonly HttpClient _client;
    private readonly DetectConverter _converter;

    public AzureAiVisionClient(
        IOptionsMonitor<AzureAiVisionSettings> options,
        HttpClient client,
        DetectConverter converter)
    {
        _options = options;
        _client = client;
        _converter = converter;
    }

    public async Task<DetectResponseModel> AnalyzeImageAsync(string imageName, Uri uri, CancellationToken cancel)
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
        var responseModel = await response.Content.ReadFromJsonAsync<ResponseModel>(cancel);
        if (responseModel is null)
        {
            throw new InvalidOperationException("Unable to deserialize response from Azure AI Vision");
        }
        return _converter.Convert(imageName, responseModel);
    }
}
