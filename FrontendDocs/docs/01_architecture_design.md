# 01. Architecture & Design System

## System Overview

C&F Bouw is engineered strictly for speed, search engine discoverability, and clean technical boundaries. The application relies entirely on **Astro 5** as a rendering engine and enforces a **Pure Astro** paradigm. By actively excluding frameworks like React or Vue, the application guarantees immediate First Contentful Paint (FCP) and prevents thread-blocking interactions.

## Core Stack Philosophy

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Core Framework** | Astro 5 | Server-first rendering. Outputs highly optimized static or edge-rendered HTML. |
| **Interactive UI** | Vanilla JS | Client interactions are achieved uniquely by standard `<script>` tags without virtual DOMs. |
| **Styling** | Vanilla CSS | Embraces native Cascading Stylesheets with CSS variables (`var(--accent)`) over arbitrary classes. |
| **Backend Integration** | API Routes | `src/pages/api/` isolates the frontend cleanly from the LaventeCare backend payload logic. |

---

## The Pure Astro Architecture

Unlike modern 'Islands' architecture which suspends independent React/Vue widgets on the page, C&F Bouw defines UI strictly natively logic. 

### `.astro` Components Structure
Components define logic directly inline. The hierarchy is cleanly divided:
- **Sections** (`src/components/sections/`): Macro structures composing full viewpoints (e.g. `HeroSection.astro`, `ServicesSection.astro`).
- **UI** (`src/components/ui/`): Dumb, reusable primitives heavily controlled by props (e.g. `<Button>`, `<Card>`).

### Client Interaction Model
When a component actively needs to respond to the DOM (like `NativeContactForm.astro`), an explicit `<script>` block is appended.
```html
<form id="contact-form">
   <!-- Inputs -->
</form>

<script>
  // Pure browser manipulation scoped correctly via module.
  const form = document.querySelector("#contact-form");
  form.addEventListener('submit', (e) => { ... });
</script>
```
*Note: Due to our usage of View Transitions, script loading and event bindings must be resilient and utilize `astro:page-load` events where necessary.*

---

## Directory Structure Strategy

```text
src/
├── components/
│   ├── sections/    # 🧱 Main page segments: Hero, Services, Werkwijze.
│   ├── ui/          # 🧩 Basic atomic primitives: Modal, Grid, Card.
│   ├── Footer.astro
│   └── Navbar.astro
├── data/            # 📊 Central state objects: images.ts, products.ts, faq.ts.
├── layouts/         # 🖼️ Master Layouts: BaseLayout.astro containing <head>.
├── lib/             # 🛠️ Helper SDKs for integrations: convex.ts, imagekit.ts.
├── pages/           # 🗺️ File Based Routing: /index.astro.
│   └── api/         # 🛡️ Server Endpoints (Proxy).
├── styles/          # 🎨 Global CSS root variables.
└── middleware.ts    # 🔒 Zero-Trust Validation guards.
```

## SPA-Like Feel (View Transitions)

Astro supports **View Transitions** natively, allowing the browser to morph between pages seamlessly avoiding a traditional "white flash" reload. 

This is structurally placed within `src/layouts/BaseLayout.astro` inside the `<head>` block via the `<ViewTransitions />` API. Because standard `DOMContentLoaded` hooks do not inherently fire during internal route changes, component scripts must respect lifecycle directives managed by `document.addEventListener('astro:page-load', () => {})`.
