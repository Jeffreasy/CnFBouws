<div align="center">
  <h1>C&F Bouw</h1>
  <p><strong>De professionele frontend applicatie voor Connect Diensten V.O.F.</strong></p>
  
  [![Astro](https://img.shields.io/badge/Astro-5.0-orange?style=flat-square&logo=astro)](https://astro.build/)
  [![Convex](https://img.shields.io/badge/Convex-1.33.1-blue?style=flat-square&logo=convex)](https://convex.dev/)
  [![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
</div>

---

## 📌 Project Overview
Deze repository bevat de performante bedrijfswebsite ten behoeve van **C&F Bouw**. Het project is volledig gebouwd als een **Pure Astro 5** applicatie en opereert bewust zonder grote front-end bibliotheken zoals React, wat zorgt voor een compromisloze performance (Zero Thead Blocking). Het systeem integreert beveiligd met het **LaventeCare AuthSystem** voor e-mail afhandeling, en maakt gebruik van **Convex** als high-speed database voor opgeslagen leads.

### 📚 The Handbook
Voor een diepgaande technische weergave van de architectuur, datastructuur, implementatie van de "Dual-Email" proxy, en de Vanilla CSS-organisatie ben je verplicht de referentie documentatie te lezen.

**👉 Start hier: [FrontendDocs / The Handbook](./FrontendDocs/docs/README.md)**

---

## 🚀 Quick Start (Local Development)

Zorg ervoor dat je `Node.js` v20+ hebt draaien.

```bash
# 1. Installeer dependencies
npm install

# 2. Kopieer .env
cp .env.example .env

# 3. Start development server
npm run dev
```
De applicatie draait nu op `http://localhost:4321`.

## ⚙️ Core Technology Stack

- **Framework**: Astro 5 (Server-first SSR + Prerendering)
- **UI & Interactivity**: Pure Astro Components & Vanilla JS Scripts
- **Styling**: Vanilla CSS + Design Tokens (`global.css`)
- **Database**: Convex (Lead opslag / Aanvragen)
- **Media Optimization**: ImageKit CDN (Responsive `srcset`)
- **Security & APIs**: LaventeCare AuthSystem & BFF Proxy

## 🏢 Bedrijfsgegevens
**Connect Diensten V.O.F. (C&F Bouw)**
- **KvK**: 97394297
