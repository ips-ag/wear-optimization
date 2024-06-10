using Api.Azure.AI.Vision;
using Api.Azure.AI.Vision.Configuration;
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
            services.AddApplicationInsightsTelemetryWorkerService();
            services.ConfigureFunctionsApplicationInsights();
            services.AddOptions<AzureAiVisionSettings>().BindConfiguration("Azure:Ai:Vision");
            services.AddHttpClient<AzureAiVisionClient>().ConfigureHttpClient(
                (sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<AzureAiVisionSettings>>().Value;
                    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", settings.Key);
                });
            services.AddOptions<AzureStorageSettings>().BindConfiguration("Azure:Storage");
            services.AddSingleton<AzureStorageClient>();
        })
    .Build();

host.Run();
