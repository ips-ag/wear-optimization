namespace Api.Azure.AI.Vision.Configuration
{
    public class AzureAiVisionSettings
    {
        public required string Endpoint { get; set; }
        public required string Key { get; set; }
        public required string ModelName { get; set; }
        public string ApiVersion { get; set; } = "2023-04-01-preview";
    }
}