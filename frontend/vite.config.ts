import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@features': 'src/features',
      '@pages': 'src/pages',
      '@shared': 'src/shared',
      '@widgets': 'src/widgets',
      '@entities': 'src/entities'
    }
  }
});
