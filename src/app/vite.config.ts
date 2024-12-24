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
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Walter Wear Optimization',
          short_name: 'Wear Optimization',
          description:
            'Walter Wear Optimization application is used for detection and recommendation on cutting tool edge wear.',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
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
  };
});
