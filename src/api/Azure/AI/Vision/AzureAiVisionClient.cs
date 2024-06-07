using System.Net.Http.Json;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api.Azure.AI.Vision
{
    public class AzureAiVisionClient
    {

        private readonly ILogger<AzureAiVisionClient> _logger;
        private readonly IOptionsMonitor<AzureAiVisionSettings> _options;
        private readonly HttpClient _client;

        public AzureAiVisionClient(
            ILogger<AzureAiVisionClient> logger,
            IOptionsMonitor<AzureAiVisionSettings> options,
            HttpClient client)
        {
            _logger = logger;
            _options = options;
            _client = client;
        }

        public async Task<string?> AnalyzeImageAsync(string url, CancellationToken cancel)
        {
            try
            {
                var settings = _options.CurrentValue;
                UriBuilder uriBuilder = new(settings.Endpoint)
                {
                    Path = "/computervision/imageanalysis:analyze",
                    Query = $"model-name={settings.ModelName}&api-version={settings.ApiVersion}"
                };
                RequestModel requestModel = new()
                {
                    Url = url
                };
                var requestContent = JsonContent.Create(requestModel);
                await requestContent.LoadIntoBufferAsync();
                var response = await _client.PostAsync(uriBuilder.Uri, requestContent, cancel);
                // response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync(cancel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing image");
                return null;
            }
        }
    }
}