import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hon-no-tobira.pages.dev',
  integrations: [tailwind()],
  output: 'static',
});
