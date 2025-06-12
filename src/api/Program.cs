using System.Text.Json;
using System.Text.Json.Serialization;
using Api.Azure.AI.Vision;
using Api.Azure.AI.Vision.Configuration;
using Api.Azure.AI.Vision.Converters;
using Api.Azure.Storage;
using Api.Azure.Storage.Configuration;
using Api.Azure.Storage.Converters;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction;
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


            //Azure AI CustomVision
            services.AddOptions<AzureAiCustomVisionSettings>().BindConfiguration("Azure:Ai:CustomVision");
            services.AddSingleton<AzureAiCustomVisionClient>();

            // Azure Storage
            services.AddOptions<AzureStorageSettings>().BindConfiguration("Azure:Storage");
            services.AddSingleton<AzureStorageClient>();
            services.AddSingleton<ImageAnalysisConverter>();
            services.AddSingleton<FeedbackConverter>();
            services.AddSingleton<WearCodeConverter>();
        })
    .Build();

host.Run();
