namespace Api.Azure.Storage.Configuration;

public class AzureStorageSettings
{
    public required string ConnectionString { get; set; }
    public string ContainerName { get; set; } = "wear-optimization";
    public string ImageAnalysisTableName { get; set; } = "WearOptimizationImageAnalysis";
}
