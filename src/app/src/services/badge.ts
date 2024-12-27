import { db } from './db';

export const badgeService = {
  async updatePendingCount() {
    if ('setAppBadge' in navigator) {
      const pending = await db.syncQueue.count();
      await navigator.setAppBadge(pending);
    }
  },
};
