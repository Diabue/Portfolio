import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Simplified config to ensure stability in all environments
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  }
});