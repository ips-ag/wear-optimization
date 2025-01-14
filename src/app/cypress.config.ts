import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4280',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 30000,
    experimentalStudio: true,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    chromeWebSecurity: false,
    video: false,
  },
  component: {
    devServer: {
      framework: 'react' as const,
      bundler: 'vite' as const,
    },
  },
});
