import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tells Vite to forward any request starting with /api to the Express backend at http://localhost:3000.

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
