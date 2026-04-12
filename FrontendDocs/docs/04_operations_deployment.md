# 04. Operations & Deployment Runbook

## Deployment Engine

The C&F Bouw Frontend acts as a hybrid Server-Side-Rendered (SSR) & Prerendered site. To properly serve the internal `/api` proxy logic, Convex hooks, and zero-trust Middleware validation, we heavily utilize **Vercel** (`@astrojs/vercel`).

### Vercel Integration Features
- **Adapter Logic**: In `astro.config.mjs`, Astro is explicitly configured tightly with Vercel endpoints. This pushes Serverless compute dynamically only for paths that require dynamic execution.
- **Edge Caching**: Highly aggressive CDN policies surround static generated templates (like `index.astro`) to minimize compute cost overhead natively.

## 1. Secrets and Configuration Matrix

Vercel Environment implementations demand 1:1 parity with the keys found inherently inside `.env`. Operating without these flags instantly derails the Astro server initialization.

| Environment Key | Context Layer | Purpose Matrix |
|-----------------|---------------|----------------|
| `PUBLIC_API_URL` | Vercel Edge / API | The core LaventeCare endpoint (`/api/v1`) driving authentication middleware checks and communication logic. |
| `PUBLIC_TENANT_ID` | Vercel Edge / API | Distinct multi-tenant identifier mapping `CnFBouws` specifically within the LaventeCare schema arrays. |
| `PUBLIC_IMAGEKIT_URL` | UI Layer | Dictates the root ImageKit endpoint URL securely resolving our optimized asset mappings. |
| `CONVEX_URL` | Server Layer | Backend data ingestion endpoint enabling persistent NoSQL telemetry logs for lead mapping. |

## 2. CI/CD Operations

Deployments are strictly autonomous following the GitHub Actions branch-push protocol:
1. Pushing branch-data towards `main` triggers an aggressive staging build architecture natively inside Vercel.
2. Vercel performs an internal `astro check` and `astro build`. If environment schemas fail or typings conflict contextually, compilation drops cleanly.
3. Upon secure validation, the pointer proxy routes traffic cleanly allowing atomic rollout parameters.

## 3. SEO Governance 

To manage our search visibility for "Kunststof Kozijnen", the `BaseLayout` generates strongly typed HTML `<meta>` properties dynamically utilizing `@astrojs/sitemap`:
- **Robots / XML**: Auto-generates mapping definitions ignoring dynamic endpoints.
- **Analytics**: Production analytics inject cleanly directly via the Vercel `@vercel/analytics` integration node during execution.
