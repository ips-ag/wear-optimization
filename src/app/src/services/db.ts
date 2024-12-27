import Dexie, { Table } from 'dexie';
import { AnalysisHistoryItem } from '@/types/history';

export class AppDatabase extends Dexie {
  analysisHistory!: Table<AnalysisHistoryItem>;

  constructor() {
    super('IpsGrowDB');
    this.version(1).stores({
      analysisHistory: '++id, timestamp',
    });
  }
}

export const db = new AppDatabase();
