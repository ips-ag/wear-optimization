namespace Api.Azure.AI.Vision.Configuration;
public class AzureAiCustomVisionSettings
{
    public required string Endpoint { get; set; }
    public required string Key { get; set; }
    public required string ModelName { get; set; }
    public required Guid ProjectId { get; set; }
}
