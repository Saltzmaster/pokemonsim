import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    svelte(),
    viteStaticCopy({
      targets: [
        { src: '_redirects', dest: '' }, // Copy _redirects to the root of the dist folder
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html',
    },
  },
});
