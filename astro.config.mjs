// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
    output: 'server',           // Astro v5: server mode + per-page `prerender = true`
    adapter: vercel(),
    integrations: [react()],
});
