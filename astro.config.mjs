// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
    output: 'server',           // Astro v5: server mode + per-page `prerender = true`
    adapter: vercel(),
    integrations: [],
});
