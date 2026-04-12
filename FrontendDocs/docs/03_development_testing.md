# 03. Development & Testing Workflow

## Tooling Prerequisite

To run the application locally, you must use standard modern Javascript tooling:
- **Node.js**: v20 or later.
- **Package Manager**: NPM.

## 1. Local Development 

### Quick Start
To bootstrap the local development environment:
```bash
# Provide environment variables (Ask engineering for production keys)
cp .env.example .env

# Install
npm install

# Run Dev Server
npm run dev
```
The application will launch and bind natively to `http://localhost:4321`.

### Directory Taxonomy Enforcement
When actively scaling the codebase, verify correct taxonomic groupings inside `src/`.
- **`components/sections/`**: Use this strict directory for macroscopic, multi-tier layout layers (Like `FAQSection.astro` or `ContactForm.astro`).
- **`components/ui/`**: Reserve this scope strictly for microscopic, self-contained objects relying exclusively on input props (`Card.astro`, `NativeContactForm.astro`).
- **`data/`**: Central nervous system for arrays avoiding hardcoded list cluttering inside DOM mapping (e.g., `services.ts`, `products.ts`, `faq.ts`).

## 2. Modifying Components & Interactivity

Because we enforce the **Pure Astro Architecture**:
1. You may not install `react`, `vue`, or `svelte` adapters to accomplish logic requirements.
2. Form captures, dynamic tab-flipping, or DOM morphs occur explicitly via `<script>` blocks embedded directly inside the parent `.astro` file.
3. Keep DOM traversal isolated: Prefer component-scoped variables (`data-attribute`) wrappers to ensure JavaScript `querySelector` logic targets the correct internal structure when multiple instances of the component render on a single page.

## 3. Quality Enforcement

Astro compiles logic into explicit server code and static HTML during builds. Validation issues (like missing `.env` strings mapped via `import.meta.env`) create fatal errors.

```bash
# Validates TypeScript typings across all standard Ts and Astro components
npx astro check

# Execute production simulation
npm run build
```

We strongly advise developers execute an `npm run build` locally prior to merging changes towards `main`. Ensure API boundaries operate explicitly.
