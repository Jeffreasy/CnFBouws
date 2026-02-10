import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, k as renderScript, l as renderHead, n as renderComponent, o as renderSlot, h as createAstro, p as Fragment, u as unescapeHTML } from '../chunks/astro/server_DfgM8LhM.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const SITE = {
  name: "C&F Bouw",
  domain: "www.cfbouw.nl",
  contact: {
    email: "info@cfbouw.nl",
    emailHref: "mailto:info@cfbouw.nl",
    whatsappHref: "https://wa.me/31613963156",
    phone: "06 13 96 31 56",
    phoneHref: "tel:+31613963156"
  },
  seo: {
    title: "Kunststof kozijnen & schuifpuien | C&F Bouw",
    description: "C&F Bouw is gespecialiseerd in het leveren en monteren van hoogwaardige kunststof kozijnen, deuren en schuifpuien. Schüco kwaliteit, vakkundige montage in Apeldoorn en omgeving."},
  nav: [
    { label: "Diensten", href: "#diensten" },
    { label: "Producten", href: "#producten" },
    { label: "Over Ons", href: "#over-ons" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Contact", href: "#contact" }
  ],
  cta: {
    primary: { label: "Offerte Aanvragen", href: "#contact" }},
  hero: {
    badge: "Specialist in Kunststof Kozijnen",
    titleLine1: "Kunststof kozijnen,",
    titleLine2: "deuren & schuifpuien",
    subtitle: "C&F Bouw is gespecialiseerd in het leveren en monteren van kunststof kozijnen, deuren en schuifpuien. Wij werken uitsluitend met Schüco — vakkundig geleverd en gemonteerd in de regio Apeldoorn.",
    stats: [
      { value: "Schüco", label: "Kwaliteitsmerk" },
      { value: "100%", label: "Maatwerk" },
      { value: "Snel", label: "Levering & Montage" }
    ]
  },
  overOns: {
    tagline: "Over Ons",
    title: "Vakmanschap met een persoonlijke aanpak",
    paragraphs: [
      "C&F Bouw is gespecialiseerd in het leveren en monteren van hoogwaardige kozijnen voor zowel particuliere als zakelijke klanten. Wij combineren vakmanschap met zorgvuldig geselecteerde producten en werken uitsluitend samen met betrouwbare fabrikanten die voldoen aan de geldende kwaliteitseisen.",
      "Door korte lijnen met onze leveranciers en een efficiënte werkwijze kunnen wij maatwerkoplossingen bieden die passen bij iedere woning of project. Van advies en inmeten tot montage en oplevering: wij begeleiden het volledige traject met aandacht voor detail en een heldere communicatie.",
      "Bij C&F Bouw staan duurzaamheid, veiligheid en afwerking centraal. Wij geloven dat goede kozijnen niet alleen bijdragen aan het comfort en de uitstraling van een pand, maar ook aan energiebesparing en woonveiligheid op de lange termijn."
    ],
    features: [
      "Snelle offerte & levering",
      "Persoonlijke begeleiding",
      "Transparante communicatie",
      "Schüco kwaliteitsgarantie"
    ]
  },
  schuco: {
    tagline: "Ons Merk",
    title: "Schüco — kwaliteit zonder compromis",
    description: "C&F Bouw werkt uitsluitend met Schüco, een wereldwijd erkend merk en koploper in de kunststof kozijnenbranche."},
  footer: {
    legalLine: "C&F Bouw is een onderdeel van Connect Diensten V.O.F.",
    kvkLine: "KvK-nummer: 97394297"
  }
};

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="navbar" id="main-nav" data-astro-cid-5blmo7yk> <div class="nav-container" data-astro-cid-5blmo7yk> <!-- Logo --> <a href="/" class="nav-logo"${addAttribute(`${SITE.name} \u2014 Homepagina`, "aria-label")} data-astro-cid-5blmo7yk> <div class="logo-mark" data-astro-cid-5blmo7yk> <span class="logo-c" data-astro-cid-5blmo7yk>C</span><span class="logo-amp" data-astro-cid-5blmo7yk>&</span><span class="logo-f" data-astro-cid-5blmo7yk>F</span> </div> <div class="logo-text" data-astro-cid-5blmo7yk> <span class="logo-name" data-astro-cid-5blmo7yk>C&F Bouw</span> <span class="logo-tagline" data-astro-cid-5blmo7yk>Kunststof Kozijnen</span> </div> </a> <!-- Desktop Navigation --> <ul class="nav-links" role="list" data-astro-cid-5blmo7yk> ${SITE.nav.map((item) => renderTemplate`<li data-astro-cid-5blmo7yk> <a${addAttribute(item.href, "href")} class="nav-link" data-astro-cid-5blmo7yk> ${item.label} </a> </li>`)} </ul> <!-- CTA + Mobile Toggle --> <div class="nav-actions" data-astro-cid-5blmo7yk> <a${addAttribute(SITE.cta.primary.href, "href")} class="btn btn-primary nav-cta" data-astro-cid-5blmo7yk> ${SITE.cta.primary.label} </a> <button class="nav-toggle" aria-label="Menu openen" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-5blmo7yk> <span class="toggle-bar" data-astro-cid-5blmo7yk></span> <span class="toggle-bar" data-astro-cid-5blmo7yk></span> <span class="toggle-bar" data-astro-cid-5blmo7yk></span> </button> </div> </div> <!-- Mobile Menu --> <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-astro-cid-5blmo7yk> <ul class="mobile-links" role="list" data-astro-cid-5blmo7yk> ${SITE.nav.map((item) => renderTemplate`<li data-astro-cid-5blmo7yk> <a${addAttribute(item.href, "href")} class="mobile-link" data-astro-cid-5blmo7yk> ${item.label} </a> </li>`)} </ul> <div class="mobile-cta" data-astro-cid-5blmo7yk> <a${addAttribute(SITE.cta.primary.href, "href")} class="btn btn-primary btn-lg mobile-btn" data-astro-cid-5blmo7yk> ${SITE.cta.primary.label} </a> <a${addAttribute(SITE.contact.phoneHref, "href")} class="btn btn-secondary btn-lg mobile-btn" data-astro-cid-5blmo7yk> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5blmo7yk> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" data-astro-cid-5blmo7yk></path> </svg>
Bel Direct
</a> </div> </div> </nav>  ${renderScript($$result, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/Navbar.astro", void 0);

const KEURMERKEN = [
  {
    id: "komo",
    name: "KOMO-keurmerk",
    abbreviation: "KOMO",
    description: "Onafhankelijk kwaliteitskeurmerk dat garandeert dat producten en processen voldoen aan de geldende bouwregelgeving."
  },
  {
    id: "vkg",
    name: "VKG-keurmerk",
    abbreviation: "VKG",
    description: "Keurmerk van de Vereniging Kunststof Gevelelementenindustrie. Staat voor kwaliteitsgarantie in kunststof kozijnen."
  },
  {
    id: "skg",
    name: "SKG-certificering",
    abbreviation: "SKG",
    description: "Het hang- en sluitwerk is SKG-gecertificeerd en geschikt voor het Politiekeurmerk Veilig Wonen."
  },
  {
    id: "pkvw",
    name: "Politie Keurmerk Veilig Wonen",
    abbreviation: "PKVW",
    description: "Keurmerk dat aangeeft dat de producten voldoen aan de veiligheidseisen voor inbraakpreventie."
  }
];
const SUBSIDIE = {
  title: "ISDE-subsidie",
  tagline: "Subsidie mogelijk",
  description: "Onze kozijnen en deuren voldoen aan alle technische eisen voor ISDE-subsidie. Wij leveren alle benodigde documenten, zodat u als klant eenvoudig zelf de subsidie kunt aanvragen."};
const TRUST_STATEMENT = "Bij C&F Bouw werken wij uitsluitend samen met betrouwbare en gecertificeerde fabrikanten. De producten die wij leveren voldoen aan hoge kwaliteitseisen en worden geproduceerd volgens de geldende normen binnen de branche.";

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" id="footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <!-- Main Footer Grid --> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Column 1: Brand --> <div class="footer-brand" data-astro-cid-sz7xmlte> <div class="footer-logo" data-astro-cid-sz7xmlte> <span class="footer-logo-c" data-astro-cid-sz7xmlte>C</span><span class="footer-logo-amp" data-astro-cid-sz7xmlte>&</span><span class="footer-logo-f" data-astro-cid-sz7xmlte>F</span> <span class="footer-logo-name" data-astro-cid-sz7xmlte>Bouw</span> </div> <p class="footer-tagline" data-astro-cid-sz7xmlte>
Specialist in kunststof kozijnen, deuren en schuifpuien.
                    Schüco kwaliteit, vakkundige montage.
</p> <!-- Keurmerken Badges --> <div class="footer-badges" data-astro-cid-sz7xmlte> ${KEURMERKEN.map((k) => renderTemplate`<span class="badge"${addAttribute(k.name, "title")} data-astro-cid-sz7xmlte> ${k.abbreviation} </span>`)} </div> </div> <!-- Column 2: Navigation --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>Navigatie</h4> <ul class="footer-list" role="list" data-astro-cid-sz7xmlte> ${SITE.nav.map((item) => renderTemplate`<li data-astro-cid-sz7xmlte> <a${addAttribute(item.href, "href")} class="footer-link" data-astro-cid-sz7xmlte> ${item.label} </a> </li>`)} </ul> </div> <!-- Column 3: Diensten --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>Diensten</h4> <ul class="footer-list" role="list" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="#diensten" class="footer-link" data-astro-cid-sz7xmlte>Advies op maat</a> </li> <li data-astro-cid-sz7xmlte> <a href="#diensten" class="footer-link" data-astro-cid-sz7xmlte>Inmeten op locatie</a> </li> <li data-astro-cid-sz7xmlte> <a href="#diensten" class="footer-link" data-astro-cid-sz7xmlte>Kunststof kozijnen</a> </li> <li data-astro-cid-sz7xmlte> <a href="#diensten" class="footer-link" data-astro-cid-sz7xmlte>Professionele montage</a> </li> </ul> </div> <!-- Column 4: Contact --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>Contact</h4> <ul class="footer-list" role="list" data-astro-cid-sz7xmlte> <li class="footer-contact-item" data-astro-cid-sz7xmlte> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-sz7xmlte></path> <polyline points="22,6 12,13 2,6" data-astro-cid-sz7xmlte></polyline> </svg> <a${addAttribute(SITE.contact.emailHref, "href")} class="footer-link" data-astro-cid-sz7xmlte>${SITE.contact.email}</a> </li> <li class="footer-contact-item" data-astro-cid-sz7xmlte> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" data-astro-cid-sz7xmlte></path> </svg> <a${addAttribute(SITE.contact.phoneHref, "href")} class="footer-link" data-astro-cid-sz7xmlte>${SITE.contact.phone}</a> </li> <li class="footer-contact-item" data-astro-cid-sz7xmlte> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte> <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" data-astro-cid-sz7xmlte></path> </svg> <a${addAttribute(SITE.contact.whatsappHref, "href")} class="footer-link" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>WhatsApp</a> </li> </ul> </div> </div> <!-- Bottom Bar --> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="footer-legal" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>${SITE.footer.legalLine}</p> <p data-astro-cid-sz7xmlte>${SITE.footer.kvkLine}</p> </div> <p class="footer-copy" data-astro-cid-sz7xmlte>
&copy; ${year} ${SITE.name}. Alle rechten voorbehouden.
</p> </div> </div> </footer> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = SITE.seo.title, description = SITE.seo.description } = Astro2.props;
  return renderTemplate`<html lang="nl"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO --><meta name="robots" content="index, follow"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:locale" content="nl_NL"><link rel="canonical"${addAttribute(`https://${SITE.domain}`, "href")}><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Fonts: Lexend (headings) + Source Sans 3 (body) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/layouts/BaseLayout.astro", void 0);

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero" id="hero" data-astro-cid-7nmnspah> <div class="hero-bg" data-astro-cid-7nmnspah> <div class="hero-gradient" data-astro-cid-7nmnspah></div> <div class="hero-grid" data-astro-cid-7nmnspah></div> </div> <div class="container hero-content" data-astro-cid-7nmnspah> <div class="hero-badge" data-astro-cid-7nmnspah> <span class="badge-dot" data-astro-cid-7nmnspah></span> ${SITE.hero.badge} </div> <h1 class="hero-title" data-astro-cid-7nmnspah> <span class="title-line" data-astro-cid-7nmnspah>${SITE.hero.titleLine1}</span> <span class="title-line title-accent" data-astro-cid-7nmnspah>${SITE.hero.titleLine2}</span> </h1> <p class="hero-subtitle" data-astro-cid-7nmnspah>${SITE.hero.subtitle}</p> <div class="hero-actions" data-astro-cid-7nmnspah> <a${addAttribute(SITE.cta.primary.href, "href")} class="btn btn-primary btn-lg" data-astro-cid-7nmnspah> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7nmnspah><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-7nmnspah></path><polyline points="22,6 12,13 2,6" data-astro-cid-7nmnspah></polyline></svg> ${SITE.cta.primary.label} </a> <a${addAttribute(SITE.contact.whatsappHref, "href")} class="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer" data-astro-cid-7nmnspah> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7nmnspah><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" data-astro-cid-7nmnspah></path></svg>
WhatsApp
</a> </div> <div class="hero-stats" data-astro-cid-7nmnspah> ${SITE.hero.stats.map((stat, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-7nmnspah": true }, { "default": ($$result2) => renderTemplate`${i > 0 && renderTemplate`<div class="stat-divider" data-astro-cid-7nmnspah></div>`}<div class="stat-item" data-astro-cid-7nmnspah> <span class="stat-value" data-astro-cid-7nmnspah>${stat.value}</span> <span class="stat-label" data-astro-cid-7nmnspah>${stat.label}</span> </div> ` })}`)} </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/HeroSection.astro", void 0);

const SERVICES = [
  {
    id: "advies",
    title: "Advies op maat",
    description: "Persoonlijk advies afgestemd op uw wensen, situatie en budget. Wij denken graag met u mee over de beste oplossing.",
    icon: "message-circle"
  },
  {
    id: "inmeten",
    title: "Inmeten op locatie",
    description: "Nauwkeurig inmeten bij u thuis of op locatie. Zo garanderen wij een perfecte pasvorm voor elk kozijn, deur of schuifpui.",
    icon: "ruler"
  },
  {
    id: "kozijnen",
    title: "Levering kunststof kozijnen",
    description: "Hoogwaardige Schüco kunststof kozijnen met uitstekende isolatiewaarden, geleverd op maat en naar wens.",
    icon: "square"
  },
  {
    id: "deuren",
    title: "Levering kunststof deuren",
    description: "Veilige en goed isolerende kunststof deuren voor zowel voor- als achtergevels, in diverse stijlen.",
    icon: "door-open"
  },
  {
    id: "schuifpuien",
    title: "Levering schuifpuien",
    description: "Ruimtelijke schuifpuien voor meer licht en een moderne uitstraling. Soepele bediening gegarandeerd.",
    icon: "panels-top-left"
  },
  {
    id: "montage",
    title: "Professionele montage",
    description: "Vakkundige montage door ervaren vakmensen. Nette afwerking en oplevering inclusief. Snel en betrouwbaar.",
    icon: "wrench"
  }
];
const WERKWIJZE = [
  {
    step: 1,
    title: "Afspraak maken",
    description: "Neem contact met ons op. Wij plannen een afspraak op locatie of in onze showroom.",
    icon: "calendar"
  },
  {
    step: 2,
    title: "Inmeten & advies",
    description: "Wij meten alles nauwkeurig in en bespreken de mogelijkheden die het beste bij uw situatie passen.",
    icon: "ruler"
  },
  {
    step: 3,
    title: "Offerte",
    description: "U ontvangt een heldere en transparante offerte, zonder verrassingen. Snelle reactie gegarandeerd.",
    icon: "file-text"
  },
  {
    step: 4,
    title: "Montage & oplevering",
    description: "Na akkoord zorgen wij voor een vakkundige montage en nette afwerking. Snel en betrouwbaar.",
    icon: "check-circle"
  }
];

const $$ServicesSection = createComponent(($$result, $$props, $$slots) => {
  const ICON_PATHS = {
    "message-circle": '<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
    ruler: '<path d="M21.3 15.3a2.4 2.4 0 010 3.4l-2.6 2.6a2.4 2.4 0 01-3.4 0L2.7 8.7a2.41 2.41 0 010-3.4l2.6-2.6a2.41 2.41 0 013.4 0z"/><path d="M14.5 12.5l2-2"/><path d="M11.5 9.5l2-2"/><path d="M8.5 6.5l2-2"/><path d="M17.5 15.5l2-2"/>',
    square: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>',
    "door-open": '<path d="M13 4h3a2 2 0 012 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 01-1.242.97L5 20V5.562a2 2 0 011.515-1.94l4-1A2 2 0 0113 4.561z"/>',
    "panels-top-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>'
  };
  return renderTemplate`${maybeRenderHead()}<section class="services" id="diensten" data-astro-cid-ttyv4st4> <div class="container" data-astro-cid-ttyv4st4> <div class="section-header" data-astro-cid-ttyv4st4> <span class="section-tag" data-astro-cid-ttyv4st4>Onze Diensten</span> <h2 class="section-title" data-astro-cid-ttyv4st4>
Complete service van advies tot oplevering
</h2> <p class="section-subtitle" data-astro-cid-ttyv4st4>
C&F Bouw verzorgt het complete traject rondom kunststof kozijnen
                en aanverwante producten. Dankzij onze efficiënte werkwijze
                kunnen wij snel schakelen.
</p> </div> <div class="services-grid" data-astro-cid-ttyv4st4> ${SERVICES.map((service) => renderTemplate`<div class="service-card glass-card" data-astro-cid-ttyv4st4> <div class="service-icon" data-astro-cid-ttyv4st4> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ttyv4st4> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(ICON_PATHS[service.icon] || "")}` })} </svg> </div> <h3 class="service-title" data-astro-cid-ttyv4st4>${service.title}</h3> <p class="service-desc" data-astro-cid-ttyv4st4>${service.description}</p> </div>`)} </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/ServicesSection.astro", void 0);

const $$AboutSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="about" id="over-ons" data-astro-cid-wm6ud4mt> <div class="container" data-astro-cid-wm6ud4mt> <div class="about-grid" data-astro-cid-wm6ud4mt> <div class="about-visual" data-astro-cid-wm6ud4mt> <div class="about-image-wrapper" data-astro-cid-wm6ud4mt> <div class="about-image-placeholder" data-astro-cid-wm6ud4mt> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3" data-astro-cid-wm6ud4mt><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-astro-cid-wm6ud4mt></rect><path d="M3 9h18" data-astro-cid-wm6ud4mt></path><path d="M9 21V9" data-astro-cid-wm6ud4mt></path></svg> <span data-astro-cid-wm6ud4mt>${SITE.name}</span> </div> </div> <div class="about-float" data-astro-cid-wm6ud4mt> <span class="float-number" data-astro-cid-wm6ud4mt>Schüco</span> <span class="float-text" data-astro-cid-wm6ud4mt>Exclusief Partner</span> </div> </div> <div class="about-content" data-astro-cid-wm6ud4mt> <span class="section-tag" data-astro-cid-wm6ud4mt>${SITE.overOns.tagline}</span> <h2 class="section-title" data-astro-cid-wm6ud4mt>${SITE.overOns.title}</h2> ${SITE.overOns.paragraphs.map((p) => renderTemplate`<p class="about-text" data-astro-cid-wm6ud4mt>${p}</p>`)} <div class="about-features" data-astro-cid-wm6ud4mt> ${SITE.overOns.features.map((feature) => renderTemplate`<div class="feature-item" data-astro-cid-wm6ud4mt> <div class="feature-check" data-astro-cid-wm6ud4mt> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wm6ud4mt> <polyline points="20 6 9 17 4 12" data-astro-cid-wm6ud4mt></polyline> </svg> </div> <span data-astro-cid-wm6ud4mt>${feature}</span> </div>`)} </div> </div> </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/AboutSection.astro", void 0);

const SCHUCO_PROFILES = [
  {
    id: "living",
    name: "Schüco Living",
    subtitle: "Premium profiel",
    description: "Schüco Living is het meest hoogwaardige profiel binnen ons assortiment. Het biedt uitstekende isolatie, een moderne uitstraling en is zeer geschikt voor energiezuinige en nieuwbouwwoningen.",
    bestFor: "Nieuwbouw & energiezuinige woningen",
    features: [
      "Hoogste isolatiewaarden",
      "Moderne uitstraling",
      "Maximaal comfort",
      "Uiterst duurzaam"
    ]
  },
  {
    id: "ct70-accent",
    name: "Schüco CT70 Accent",
    subtitle: "Klassieke kwaliteit",
    description: "Schüco CT70 Accent combineert betrouwbare kwaliteit met een klassiek design. Dit profiel is een goede keuze voor renovaties en bestaande woningen waar uitstraling en prijs-kwaliteitverhouding belangrijk zijn.",
    bestFor: "Renovaties & bestaande woningen",
    features: [
      "Klassiek design",
      "Betrouwbare kwaliteit",
      "Goede prijs-kwaliteit",
      "Veelzijdig inzetbaar"
    ]
  },
  {
    id: "ct70",
    name: "Schüco Corona CT70",
    subtitle: "Veelzijdig & stevig",
    description: "Schüco Corona CT70 is een stevig en veelzijdig profiel met goede isolatiewaarden. Het is geschikt voor zowel nieuwbouw als renovatie en staat bekend om zijn duurzaamheid en stabiliteit.",
    bestFor: "Nieuwbouw & renovatie",
    features: [
      "Stevig & stabiel",
      "Goede isolatie",
      "Duurzaam materiaal",
      "Breed inzetbaar"
    ]
  }
];
const PRODUCT_CATEGORIES = [
  {
    id: "kozijnen",
    name: "Kunststof Kozijnen",
    description: "Onze kunststof kozijnen zijn duurzaam, onderhoudsarm en hebben uitstekende isolatiewaarden. Ze dragen bij aan energiebesparing en verhogen het wooncomfort.",
    icon: "square"
  },
  {
    id: "deuren",
    name: "Kunststof Deuren",
    description: "Wij leveren kunststof deuren die veiligheid, isolatie en design combineren. Geschikt voor zowel voor- als achterdeuren.",
    icon: "door-open"
  },
  {
    id: "schuifpuien",
    name: "Schuifpuien",
    description: "Onze kunststof schuifpuien zorgen voor extra licht, ruimte en een moderne uitstraling, met een soepele bediening en goede isolatie.",
    icon: "panels-top-left"
  },
  {
    id: "sierpanelen",
    name: "Sierpanelen",
    description: "Decoratieve sierpanelen voor een unieke afwerking van uw kozijnen en deuren. Diverse stijlen en kleuren beschikbaar.",
    icon: "layout-grid"
  },
  {
    id: "hefschuifdeur",
    name: "Hefschuifdeuren",
    description: "Grote schuifdeuren voor maximale openheid en een naadloze overgang tussen binnen en buiten. Soepele bediening en optimale isolatie.",
    icon: "move-horizontal"
  }
];

const $$ProductsSection = createComponent(($$result, $$props, $$slots) => {
  const CAT_ICONS = {
    square: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>',
    "door-open": '<path d="M13 4h3a2 2 0 012 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 01-1.242.97L5 20V5.562a2 2 0 011.515-1.94l4-1A2 2 0 0113 4.561z"/>',
    "panels-top-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    "move-horizontal": '<polyline points="18 8 22 12 18 16"/><polyline points="6 8 2 12 6 16"/><line x1="2" x2="22" y1="12" y2="12"/>'
  };
  return renderTemplate`${maybeRenderHead()}<section class="products" id="producten" data-astro-cid-yw2btwjk> <div class="container" data-astro-cid-yw2btwjk> <div class="section-header" data-astro-cid-yw2btwjk> <span class="section-tag" data-astro-cid-yw2btwjk>Onze Producten</span> <h2 class="section-title" data-astro-cid-yw2btwjk>
Kunststof kozijnen, deuren & schuifpuien
</h2> <p class="section-subtitle" data-astro-cid-yw2btwjk>
Wij leveren een compleet assortiment kunststof gevelelementen
                van het merk Schüco — van kozijnen en deuren tot schuifpuien en
                sierpanelen.
</p> </div> <div class="products-grid" data-astro-cid-yw2btwjk> ${PRODUCT_CATEGORIES.map((cat) => renderTemplate`<div class="product-card glass-card" data-astro-cid-yw2btwjk> <div class="product-icon" data-astro-cid-yw2btwjk> <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-yw2btwjk> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(CAT_ICONS[cat.icon] || "")}` })} </svg> </div> <h3 class="product-title" data-astro-cid-yw2btwjk>${cat.name}</h3> <p class="product-desc" data-astro-cid-yw2btwjk>${cat.description}</p> </div>`)} </div> <!-- Schüco Profiles --> <div class="schuco-section" data-astro-cid-yw2btwjk> <div class="schuco-header" data-astro-cid-yw2btwjk> <span class="section-tag" data-astro-cid-yw2btwjk>${SITE.schuco.tagline}</span> <h3 class="schuco-title" data-astro-cid-yw2btwjk>${SITE.schuco.title}</h3> <p class="section-subtitle" data-astro-cid-yw2btwjk>${SITE.schuco.description}</p> </div> <div class="profiles-grid" data-astro-cid-yw2btwjk> ${SCHUCO_PROFILES.map((profile) => renderTemplate`<div class="profile-card glass-card" data-astro-cid-yw2btwjk> <div class="profile-header" data-astro-cid-yw2btwjk> <span class="profile-badge" data-astro-cid-yw2btwjk> ${profile.subtitle} </span> <h4 class="profile-name" data-astro-cid-yw2btwjk>${profile.name}</h4> </div> <p class="profile-desc" data-astro-cid-yw2btwjk>${profile.description}</p> <p class="profile-best-for" data-astro-cid-yw2btwjk> <strong data-astro-cid-yw2btwjk>Ideaal voor:</strong> ${profile.bestFor} </p> <ul class="profile-features" data-astro-cid-yw2btwjk> ${profile.features.map((f) => renderTemplate`<li class="profile-feature" data-astro-cid-yw2btwjk> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-yw2btwjk> <polyline points="20 6 9 17 4 12" data-astro-cid-yw2btwjk></polyline> </svg> ${f} </li>`)} </ul> </div>`)} </div> </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/ProductsSection.astro", void 0);

const $$WerkwijzeSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="werkwijze" id="werkwijze" data-astro-cid-sikk3hgs> <div class="container" data-astro-cid-sikk3hgs> <div class="section-header" data-astro-cid-sikk3hgs> <span class="section-tag" data-astro-cid-sikk3hgs>Werkwijze</span> <h2 class="section-title" data-astro-cid-sikk3hgs>Duidelijk en overzichtelijk proces</h2> <p class="section-subtitle" data-astro-cid-sikk3hgs>
Van eerste contact tot oplevering — wij hanteren een heldere
                werkwijze zodat u altijd weet waar u aan toe bent.
</p> </div> <div class="werkwijze-grid" data-astro-cid-sikk3hgs> ${WERKWIJZE.map((step) => renderTemplate`<div class="werkwijze-step" data-astro-cid-sikk3hgs> <div class="step-number" data-astro-cid-sikk3hgs>${step.step}</div> <div class="step-content" data-astro-cid-sikk3hgs> <h3 class="step-title" data-astro-cid-sikk3hgs>${step.title}</h3> <p class="step-desc" data-astro-cid-sikk3hgs>${step.description}</p> </div> ${step.step < 4 && renderTemplate`<div class="step-connector" data-astro-cid-sikk3hgs></div>`} </div>`)} </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/WerkwijzeSection.astro", void 0);

const $$TrustSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="trust" id="keurmerken" data-astro-cid-jujwe3as> <div class="container" data-astro-cid-jujwe3as> <div class="section-header" data-astro-cid-jujwe3as> <span class="section-tag" data-astro-cid-jujwe3as>Kwaliteit & Veiligheid</span> <h2 class="section-title" data-astro-cid-jujwe3as>Gecertificeerde kwaliteit</h2> <p class="section-subtitle" data-astro-cid-jujwe3as>${TRUST_STATEMENT}</p> </div> <div class="keurmerken-grid" data-astro-cid-jujwe3as> ${KEURMERKEN.map((k) => renderTemplate`<div class="keurmerk-card glass-card" data-astro-cid-jujwe3as> <div class="keurmerk-icon" data-astro-cid-jujwe3as> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jujwe3as> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-jujwe3as></path> </svg> </div> <span class="keurmerk-abbr" data-astro-cid-jujwe3as>${k.abbreviation}</span> <h4 class="keurmerk-name" data-astro-cid-jujwe3as>${k.name}</h4> <p class="keurmerk-desc" data-astro-cid-jujwe3as>${k.description}</p> </div>`)} </div> <!-- Subsidie Banner --> <div class="subsidie-banner glass-card" data-astro-cid-jujwe3as> <div class="subsidie-icon" data-astro-cid-jujwe3as> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jujwe3as><circle cx="12" cy="12" r="10" data-astro-cid-jujwe3as></circle><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" data-astro-cid-jujwe3as></path><path d="M12 18V6" data-astro-cid-jujwe3as></path></svg> </div> <div class="subsidie-content" data-astro-cid-jujwe3as> <span class="subsidie-tag" data-astro-cid-jujwe3as>${SUBSIDIE.tagline}</span> <h3 class="subsidie-title" data-astro-cid-jujwe3as>${SUBSIDIE.title}</h3> <p class="subsidie-desc" data-astro-cid-jujwe3as>${SUBSIDIE.description}</p> </div> </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/TrustSection.astro", void 0);

const $$ContactCTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="cta" id="contact" data-astro-cid-tvssgao4> <div class="container" data-astro-cid-tvssgao4> <div class="cta-card glass-card" data-astro-cid-tvssgao4> <div class="cta-glow" data-astro-cid-tvssgao4></div> <div class="cta-content" data-astro-cid-tvssgao4> <h2 class="cta-title" data-astro-cid-tvssgao4>Vrijblijvend advies of offerte?</h2> <p class="cta-text" data-astro-cid-tvssgao4>
Neem contact met ons op voor een persoonlijke offerte,
                    afspraak voor adviesgesprek en inmeten, of bezoek onze
                    showroom. Wij denken graag met u mee.
</p> <div class="cta-actions" data-astro-cid-tvssgao4> <a${addAttribute(SITE.contact.emailHref, "href")} class="btn btn-primary btn-lg" data-astro-cid-tvssgao4> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tvssgao4><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-tvssgao4></path><polyline points="22,6 12,13 2,6" data-astro-cid-tvssgao4></polyline></svg>
Offerte Aanvragen
</a> <a${addAttribute(SITE.contact.phoneHref, "href")} class="btn btn-secondary btn-lg" data-astro-cid-tvssgao4> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tvssgao4><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" data-astro-cid-tvssgao4></path></svg>
Bel Direct
</a> <a${addAttribute(SITE.contact.whatsappHref, "href")} class="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer" data-astro-cid-tvssgao4> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tvssgao4><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" data-astro-cid-tvssgao4></path></svg>
WhatsApp
</a> </div> <p class="cta-contact-info" data-astro-cid-tvssgao4> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tvssgao4><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-tvssgao4></path><polyline points="22,6 12,13 2,6" data-astro-cid-tvssgao4></polyline></svg> ${SITE.contact.email} &nbsp;|&nbsp;
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tvssgao4><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" data-astro-cid-tvssgao4></path></svg> ${SITE.contact.phone} </p> </div> </div> </div> </section> `;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/components/sections/ContactCTA.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "ServicesSection", $$ServicesSection, {})} ${renderComponent($$result2, "AboutSection", $$AboutSection, {})} ${renderComponent($$result2, "ProductsSection", $$ProductsSection, {})} ${renderComponent($$result2, "WerkwijzeSection", $$WerkwijzeSection, {})} ${renderComponent($$result2, "TrustSection", $$TrustSection, {})} ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/pages/index.astro", void 0);

const $$file = "C:/Users/JJALa/Desktop/2026Developer/CnFBouw/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
