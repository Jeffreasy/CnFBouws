# C&F Bouw — Website

Bedrijfswebsite van **C&F Bouw** (Connect Diensten V.O.F.), gespecialiseerd in kunststof kozijnen, deuren en schuifpuien met Schüco kwaliteit.

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| Framework | [Astro 5](https://astro.build) (SSR + prerender) |
| UI | Astro Components + React 19 Islands |
| Styling | Vanilla CSS via design tokens (`global.css`) |
| Images | [ImageKit](https://imagekit.io) CDN met responsive srcset |
| Email | [Resend](https://resend.com) transactional email |
| Auth | LaventeCare AuthSystem (Zero-Trust middleware) |
| Hosting | [Vercel](https://vercel.com) |

## Projectstructuur

```
src/
├── components/
│   ├── sections/      # 9 page sections (Hero, Services, Products, etc.)
│   ├── islands/       # React islands (ContactFormIsland)
│   ├── ui/            # Reusable UI (Card, Grid, Icon, Modal, etc.)
│   ├── Navbar.astro
│   └── Footer.astro
├── data/              # Centralized site data (site.ts, services.ts, etc.)
├── layouts/           # BaseLayout with View Transitions
├── lib/               # Utilities (imagekit, email, rateLimit, api)
├── pages/
│   ├── index.astro    # Homepage (prerendered)
│   └── api/           # Server endpoints (contact, auth)
├── styles/            # global.css design system
└── middleware.ts      # Zero-Trust session validation
```

## Development

```bash
npm install            # Installeer dependencies
npm run dev            # Start dev server op localhost:4321
npm run build          # Productie build
npm run preview        # Preview build lokaal
```

## Environment Variables

Maak een `.env` bestand aan (zie `.env.example`):

```env
PUBLIC_API_URL=         # LaventeCare API endpoint
PUBLIC_TENANT_ID=       # Tenant identifier
PUBLIC_IMAGEKIT_URL=    # ImageKit base URL
RESEND_API_KEY=         # Resend email API key
CONTACT_EMAIL=          # Ontvangst e-mailadres
```

## KvK

**Connect Diensten V.O.F.** — KvK: 97394297
