import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@screens': path.resolve(__dirname, './src/screens'),
      // '@pages': path.resolve(__dirname, './src/pages'),
      // '@store': path.resolve(__dirname, './src/store'),
      // '@hooks': path.resolve(__dirname, './src/hooks'),
      // '@utils': path.resolve(__dirname, './src/utils'),
      // '@constants': path.resolve(__dirname, './src/constants'),
      // '@services': path.resolve(__dirname, './src/services'),
    },
  },
});
