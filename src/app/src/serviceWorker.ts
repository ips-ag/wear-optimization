import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

type ExtendableEvent = Event & { waitUntil: (promise: Promise<void>) => void };
declare let self: ServiceWorkerGlobalScope & {
  skipWaiting(): Promise<void>;
  clients: { claim(): Promise<void> };
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
  addEventListener: (type: string, listener: (event: ExtendableEvent) => void) => void;
};

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      {
        // Log service worker activity
        requestWillFetch: async ({ request }) => {
          console.log('Service Worker: Fetching', request.url);
          return request;
        },
        handlerDidRespond: async ({ response }) => {
          console.log('Service Worker: Response received', response?.status);
        },
      },
    ],
  }),
);

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(self.clients.claim());
});
