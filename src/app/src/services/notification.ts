export const notificationService = {
  async requestPermission() {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  async sendAnalysisComplete(result: string) {
    if (Notification.permission === 'granted') {
      new Notification('Analysis Complete', {
        body: `Your wear pattern analysis: ${result}`,
        icon: '/icon-192x192.png',
      });
    }
  },
};
