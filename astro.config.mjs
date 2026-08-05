// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Деплой: GitHub Pages (project site) → https://manath-iq.github.io/kitchen-template/
// Для кастомного домена клиента: site = 'https://domain.ru', base = '/'.
export default defineConfig({
  site: 'https://manath-iq.github.io',
  base: '/kitchen-template',
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
