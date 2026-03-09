import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const marketingHtmlPlugin = () => ({
  name: 'marketing-html',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url !== '/' && !req.url.startsWith('/@') && !req.url.startsWith('/src') && !req.url.startsWith('/node_modules') && !req.url.includes('.')) {
        req.url = '/marketing.html';
      } else if (req.url === '/') {
        req.url = '/marketing.html';
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), marketingHtmlPlugin()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist/marketing',
    rollupOptions: {
      input: resolve(process.cwd(), 'marketing.html'),
    },
  },
});
