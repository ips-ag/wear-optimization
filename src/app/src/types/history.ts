import { ResultModel } from './detect';

export interface AnalysisHistoryItem {
  id: string;
  timestamp: number;
  imageSrc: string;
  result: ResultModel;
  feedback?: {
    accepted: boolean;
    timestamp: number;
    comment?: string;
    userWearCode?: number;
  };
}

export interface AnalysisHistoryStore {
  items: AnalysisHistoryItem[];
  lastSync?: number;
}

export interface SyncQueueItem {
  id?: number;
  type: 'analysis';
  data: string; // base64 image
  timestamp: number;
}
