import Dexie, { Table } from 'dexie';
import { AnalysisHistoryItem, SyncQueueItem } from '@/types/history';

class TestDatabase extends Dexie {
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

export const clearTestDatabase = () => {
  return new TestDatabase().delete();
};

export const seedTestData = async (data?: Partial<AnalysisHistoryItem>) => {
  const db = new TestDatabase();

  const testData: AnalysisHistoryItem = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    imageSrc: 'data:image/png;base64,test-image-data',
    result: {
      imageName: 'test-image.png',
      wearCode: 1, // Assuming 1 is a valid wear code
      wearConfidence: 0.95,
      wearCause: 'Test wear cause',
      suggestedActions: ['Action 1', 'Action 2'],
    },
    ...data, // Allow overriding with custom data
  };

  await db.analysisHistory.add(testData);
  return testData;
};

export const addToSyncQueue = async (imageData: string) => {
  const db = new TestDatabase();

  const queueItem: SyncQueueItem = {
    type: 'analysis',
    data: imageData,
    timestamp: Date.now(),
  };

  await db.syncQueue.add(queueItem);
  return queueItem;
};
