// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Публикуется на собственном поддомене, в корне — base не нужен.
export default defineConfig({
  site: 'https://kitchen-template.manath.site',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
    },
  },
});
