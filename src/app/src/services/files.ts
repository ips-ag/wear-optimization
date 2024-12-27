import { AnalysisHistoryItem } from '@/types';

export const fileSystem = {
  async saveAnalysis(id: string, data: AnalysisHistoryItem) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `analysis-${id}.json`,
      });
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(data));
      await writable.close();
    } catch (err) {
      console.error('Failed to save:', err);
    }
  },
};
