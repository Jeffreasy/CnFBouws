# 05. Components & Styling Reference

## 1. Methodology: Vanilla CSS

Unlike heavily utility-driven projects (like Tailwind), C&F Bouw emphasizes a lean, semantic, **Vanilla CSS** methodology.

### Why Vanilla CSS?
- Removes massive dependency footprints during compilation.
- Leverages native browser APIs like CSS Grid and Flexbox efficiently.
- Scopes naturally without collision issues via Astro's built in component `<style>` architecture.

## 2. Global Design Tokens (`src/styles/global.css`)

All colors, typographic scales, borders, and breakpoints are governed by CSS Custom Properties at the root `.astro` layer format.

```css
:root {
  --primary-color: #0d1b2a;
  --secondary-color: #415a77;
  --accent-color: #e0e1dd;
  --font-family-base: 'Inter', system-ui, sans-serif;
  --spacing-md: 1.5rem;
}
```

These tokens establish the structural DNA. Rather than hardcoding `color: #0d1b2a;`, standardizing via `color: var(--primary-color)` enforces design consistency across entirely independent component hierarchies.

## 3. Component Styling Syntax

### Scoped `.astro` Blocks
When building UI elements like `HeroSection.astro`, CSS rules written inside `<style>` tags are naturally hashed and **scoped exclusively to that component**.

```html
<section class="hero-wrapper">
  <h1>Title</h1>
</section>

<style>
/* This rule ONLY applies to the <section> directly rendered inside this specific component file. */
.hero-wrapper {
  background: var(--primary-color);
  padding: var(--spacing-md);
}
</style>
```

### Unscoped / Global Injections
If you explicitly require a style rule to break scoping and apply uniformly to inner children components (which may be deeply nested or injected by React), use the `is:global` directive.

```html
<style is:global>
  .dynamic-wysiwyg-content p {
    margin-bottom: 2rem;
  }
</style>
```

## 4. UI Library Mapping

Since there is no generic utility pipeline generating permutations of spacing and sizes:
- Prefer semantic classnames (e.g. `service-card`, `section-header`).
- Build layouts predictably with CSS native `gap`, `display: grid`, and relative unit (`rem`/`em`) scaling.
- Utilize standard `@media` queries bounded to the predefined root variables for robust viewport elasticity.
