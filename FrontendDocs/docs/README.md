# C&F Bouw Frontend - The Handbook

> **Core Philosophy**: "Maximum Performance, Native Tooling, Zero Boilerplate."

C&F Bouw is a high-performance web application built natively on **Astro 5**. Acting as a **Pure Astro Project** — meaning zero reliance on React or heavy client frameworks — it ships completely static HTML for unparalleled SEO rankings, enabling interactivity purely through scoped Vanilla JavaScript. The platform incorporates **Convex** for real-time lead storage, **ImageKit** for edge-optimized assets, and acts as a specialized proxy node within the broader **LaventeCare AuthSystem**.

## The Core 5 Master Documents

Welcome to the consolidated frontend handbook. Everything you need to architect, design, and operate the platform is divided into these chapters:

### [01. Architecture & Design System](./01_architecture_design.md)
The foundation of the frontend platform. Details the Pure Astro Architecture, the absolute absence of React ("No Islands"), file-based routing protocols, and native View Transitions integration.

### [02. Data, State & Integration](./02_data_state_integration.md)
The integration manual. Explains how the frontend communicates with external services. Covers the local Astro API proxy (`/api/contact`), the **LaventeCare AuthSystem Dual-Email Pipeline**, real-time persistence via **Convex**, and robust asset delivery via **ImageKit CDN**.

### [03. Development & Testing Workflow](./03_development_testing.md)
The Frontend Engineer's onboarding guide. Details local development environment setup and the strict `src/` directory taxonomy (`sections/`, `ui/`, `data/`, `lib/`). 

### [04. Operations & Deployment Runbook](./04_operations_deployment.md)
The DevOps guide for the edge. Instructions for **Vercel** deployment, Edge networking configurations, Environment Variables management, and build boundaries.

### [05. Components & Styling Reference](./05_components_styling_reference.md)
The CSS architecture guide. Explains the strict usage of **Vanilla CSS**, documenting how to use `global.css` tokens, custom properties, and Astro's default scoped styling behavior to effectively decouple design and structure.

---

## Key Capabilities at a Glance:

- **100% Pure Astro**: No React Islands. No heavy client-side execution overhead. `<script>` tags embedded in Astro components orchestrate client interactions cleanly and explicitly.
- **LaventeCare Dual-Email Dispatch**: Contact forms securely hit internal APIs routing lead information directly into the LaventeCare Go-Backend for guaranteed SMTP dispatch (admin notification & customer confirmation).
- **Convex Database**: Validated requests are piped to Convex Serverlessly preventing local state-bloat while providing a permanent persistence layer.
- **Vanilla CSS System**: No enormous tailwind utility footprint. Scoped CSS rules within `<style>` blocks paired with global CSS variables.
- **Optimized Assets (ImageKit)**: Complete offloading of image processing to a dedicated CDN, enabling modern `.webp`/`.avif` formats and responsive breakpoints.
- **Astro Proxy APIs**: Strict adherence to security standards leveraging the native `/api` layer to shield logic and environment keys.
