import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { securityHeadersPlugin } from './vite-plugins/security-headers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityHeadersPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
