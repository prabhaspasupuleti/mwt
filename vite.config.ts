import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/', // Ensures correct base path for deployment
  build: {
    outDir: 'dist', // Sets the output directory for the build
  },
  server: {
    historyApiFallback: true, // This helps with client-side routing
  },
  preview: {
    historyApiFallback: true, // This helps with client-side routing in preview mode
  }
});