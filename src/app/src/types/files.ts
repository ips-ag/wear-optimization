export {};

declare global {
  interface Window {
    showSaveFilePicker: (options?: { suggestedName?: string }) => Promise<{
      createWritable: () => Promise<{
        write: (data: string) => Promise<void>;
        close: () => Promise<void>;
      }>;
    }>;
  }
}
