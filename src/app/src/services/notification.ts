export const notificationService = {
  async requestPermission() {
    // Only request if we haven't been denied before
    if (Notification.permission === 'denied') {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  },

  async sendAnalysisComplete(result: string) {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification('Analysis Complete', {
          body: `Your wear pattern analysis: ${result}`,
          icon: '/icon-192x192.png',
          badge: '/mask-icon.svg',
          tag: 'analysis-complete',
          renotify: true,
          requireInteraction: true,
        });
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    }
  },
};
