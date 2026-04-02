// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://www.cfbouw.nl',
    output: 'server',           // Astro v5: server mode + per-page `prerender = true`
    adapter: vercel(),
    integrations: [sitemap()],
});
