import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const appHtmlPlugin = () => ({
  name: 'app-html',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Serve app.html for all routes (SPA fallback)
      if (req.url !== '/' && !req.url.startsWith('/@') && !req.url.startsWith('/src') && !req.url.startsWith('/node_modules') && !req.url.includes('.')) {
        req.url = '/app.html';
      } else if (req.url === '/') {
        req.url = '/app.html';
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), appHtmlPlugin()],
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist/app',
    rollupOptions: {
      input: resolve(process.cwd(), 'app.html'),
    },
  },
});
