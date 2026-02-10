// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
    output: 'server',           // SSR-first — static pages use `export const prerender = true`
    adapter: vercel(),
    integrations: [react()],
});
