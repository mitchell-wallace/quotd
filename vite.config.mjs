import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Use relative paths for Capacitor (mobile), absolute paths for web
  const isMobile = process.env.BUILD_TARGET === 'mobile';

  return {
    base: isMobile ? './' : '/',
    plugins: [vue(), tsconfigPaths(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.mjs',
    },
  };
});
