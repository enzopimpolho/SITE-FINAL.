import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Painel admin (LeadJá) servido em /admin dentro do site da Nextgen.
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  // não herdar o postcss.config.js do site (Tailwind 3); o admin usa Tailwind 4 via plugin
  css: { postcss: {} },
  build: { outDir: '../dist/admin', emptyOutDir: true },
});
