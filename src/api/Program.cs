using System.Text.Json;
using System.Text.Json.Serialization;
using Api.Azure.AI.Vision;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Converters;
using Api.Azure.Storage;
using Api.Azure.Storage.Configuration;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(
        services =>
        {
            services.Configure<JsonSerializerOptions>(
                options =>
                {
                    options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                    options.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                }
            );
            services.AddApplicationInsightsTelemetryWorkerService();
            services.ConfigureFunctionsApplicationInsights();
            // Azure AI Vision
            services.AddOptions<AzureAiVisionSettings>().BindConfiguration("Azure:Ai:Vision");
            services.AddHttpClient<AzureAiVisionClient>().ConfigureHttpClient(
                (sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<AzureAiVisionSettings>>().Value;
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", settings.Key);
                });
            services.AddSingleton<DetectConverter>();
            // Azure Storage
            services.AddOptions<AzureStorageSettings>().BindConfiguration("Azure:Storage");
            services.AddSingleton<AzureStorageClient>();
        })
    .Build();

host.Run();
