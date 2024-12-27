import Dexie, { Table } from 'dexie';
import { AnalysisHistoryItem, SyncQueueItem } from '@/types/history';
import { badgeService } from './badge';
import { detectApi } from '@/api/detect';
import { WearCode } from '@/types';

export class AppDatabase extends Dexie {
  analysisHistory!: Table<AnalysisHistoryItem>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super('IpsGrowDB');
    this.version(1).stores({
      analysisHistory: '++id, timestamp',
      syncQueue: '++id, type, timestamp',
    });
  }
}

export const db = new AppDatabase();

// Add sync manager to handle offline actions
export const syncManager = {
  async queueAnalysis(imageData: string) {
    await db.syncQueue.add({
      type: 'analysis',
      data: imageData,
      timestamp: Date.now(),
    });
    await badgeService.updatePendingCount();
  },

  async processPendingQueue() {
    const pending = await db.syncQueue.toArray();
    for (const item of pending) {
      if (navigator.onLine) {
        try {
          const blob = await fetch(item.data).then(r => r.blob());
          const file = new File([blob], 'capture.png', { type: 'image/png' });
          const response = await detectApi(file);
          const result = response.result;

          await db.analysisHistory.add({
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            imageSrc: item.data,
            result: {
              imageName: file.name,
              wearCode: result?.wearCode ?? WearCode.none,
              wearConfidence: result?.wearConfidence ?? 0,
              wearCause: result?.wearCause ?? '',
              suggestedActions: result?.suggestedActions ?? [],
            },
          });
          await db.syncQueue.delete(item.id!);
        } catch (err) {
          console.error('Failed to process:', err);
        }
      }
    }
    await badgeService.updatePendingCount();
  },
};
