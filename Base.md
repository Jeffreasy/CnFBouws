# 🏗️ C&F Bouw — Technische Architectuur

Astro 5 bedrijfswebsite voor kunststof kozijnen & montage. Zero React runtime.

## Stack

| Laag | Technologie |
|------|-------------|
| Framework | Astro 5 (`output: 'server'`, per-page `prerender`) |
| Hosting | Vercel |
| Analytics | Vercel Analytics (`@vercel/analytics`) |
| Database | Convex (lead management) |
| Email | Resend API (contactformulier) |
| CDN | ImageKit (responsive images, LQIP blur-up) |
| Auth | LaventeCare AuthSystem (Zero-Trust middleware, BFF proxy) |

## Environment Variables

```env
# .env / .env.local
PUBLIC_API_URL="https://laventecareauthsystems.onrender.com/api/v1"
PUBLIC_TENANT_ID="3b542934-6ac6-42b2-9511-a09e6cff8c80"
PUBLIC_IMAGEKIT_URL="https://ik.imagekit.io/a0oim4e3e"
CONVEX_URL="<convex deployment URL>"
RESEND_API_KEY="<resend API key>"
CONTACT_EMAIL="info@cfbouw.nl"
```

## Architectuur

```
Browser → Astro SSR (Vercel) → Convex Cloud (leads)
                              → Resend API (email)
                              → LaventeCare AuthSystem (sessie validatie)
                              → ImageKit CDN (images)
```

### Contact Form Pipeline
1. Client-side validatie (vanilla JS)
2. `POST /api/contact` → Origin check (CSRF)
3. Rate limiting (5/15min per IP)
4. Honeypot check (silent accept for bots)
5. Resend email → C&F inbox
6. Persist to Convex (non-blocking)

### Auth Flow (Zero-Trust)
- Middleware valideert sessie tegen LaventeCare AuthSystem op elke non-prerendered request
- Auth proxy (`/api/auth/*`) handelt login/logout/refresh af met cookie sanitization
- BFF proxy (`/api/*`) forwardt API calls met tenant isolation (`X-Tenant-ID`)
- Beschermde routes: `/admin`, `/dashboard`, `/profile` → redirect naar `/login`

### Security
- HttpOnly cookies, SameSite=Lax, Secure alleen in productie
- `PasswordHash`/`MfaSecret` gestript uit responses
- Token nooit in response body
- `X-Frame-Options: DENY` (productie)
- `X-Content-Type-Options: nosniff`

## Vercel Deployment

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Na deployment, voeg de productie-URL toe aan de tenant CORS origins:

```sql
UPDATE tenants
SET allowed_origins = array_append(allowed_origins, 'https://www.cfbouw.nl')
WHERE slug = 'cf-bouw';
```