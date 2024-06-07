using System.Net;
using System.Net.Http.Json;
using Api.Azure.AI.Vision;
using Api.Azure.AI.Vision.Configuration;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api.Functions.Detect
{
    public class DetectFunction
    {
        private readonly ILogger _logger;
        private readonly AzureAiVisionClient _client;

        public DetectFunction(ILogger<DetectFunction> logger, AzureAiVisionClient client)
        {
            _logger = logger;
            _client = client;
        }

        [Function("Detect")]
        public async Task<HttpResponseData> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req,
            CancellationToken cancel)
        {
            // TODO: obtain image from body
            // copy image to azure storage account
            // get image SAS url
            const string url = "https://cdn.plansee-group.com/is/image/planseemedia/Verschleissarten-Aufbauschneidenbildung";
            var result = await _client.AnalyzeImageAsync(url, cancel);
            if (result is null)
            {
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteStringAsync(result, cancel);
            return response;
        }
    }
}
