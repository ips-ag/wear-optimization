import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: () => {
            return 'assets/[name].[ext]';
          },
        },
      },
    },
    plugins: [
      react({
        babel: {
          presets: ['jotai/babel/preset'],
        },
      }),
      VitePWA({
        registerType: 'prompt',
        devOptions: {
          enabled: true,
          type: 'module',
        },
        includeAssets: ['favicon.ico', 'icon-192x192.png', 'icon-512x512.png', 'manifest.webmanifest'],
        manifest: {
          name: 'IPS Grow',
          short_name: 'IPS Grow',
          start_url: './',
          scope: './',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [
            {
              src: './icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: './icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /\.(ico|png|svg|webmanifest)$/,
              handler: 'CacheFirst',
            },
          ],
        },
        injectRegister: 'auto',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@api': path.resolve(__dirname, './src/api'),
        '@libs': path.resolve(__dirname, './src/libs'),
      },
    },
    pwa: {
      manifest: {
        share_target: {
          action: '/share-target',
          method: 'POST',
          enctype: 'multipart/form-data',
          params: {
            files: [
              {
                name: 'image',
                accept: ['image/*'],
              },
            ],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      headers: {
        'Service-Worker-Allowed': '/',
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
});
