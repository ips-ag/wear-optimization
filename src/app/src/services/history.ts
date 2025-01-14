import { db } from './db';
import { AnalysisHistoryItem, ResultModel } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const historyService = {
  async addAnalysis(imageSrc: string, result: ResultModel): Promise<string> {
    const id = uuidv4();
    const historyItem: AnalysisHistoryItem = {
      id,
      timestamp: Date.now(),
      imageSrc,
      result,
    };

    await db.analysisHistory.add(historyItem);
    return id;
  },

  async getRecentAnalyses(limit = 5): Promise<AnalysisHistoryItem[]> {
    return await db.analysisHistory.orderBy('timestamp').reverse().limit(limit).toArray();
  },

  async getAllAnalyses(): Promise<AnalysisHistoryItem[]> {
    return await db.analysisHistory.orderBy('timestamp').reverse().toArray();
  },

  async deleteAnalysis(id: string): Promise<void> {
    await db.analysisHistory.delete(id);
  },

  async getAnalysisById(id: string): Promise<AnalysisHistoryItem | undefined> {
    return await db.analysisHistory.get(id);
  },

  async updateFeedback(id: string, accepted: boolean, comment?: string, wearCode?: number): Promise<void> {
    await db.analysisHistory.update(id, {
      feedback: {
        accepted,
        timestamp: Date.now(),
        comment,
        userWearCode: wearCode,
      },
    });
  },

  async hasFeedback(id: string): Promise<boolean> {
    const item = await db.analysisHistory.get(id);
    return !!item?.feedback;
  },
};
