// ─── C&F Bouw — Centralized Site Data ────────────────────
// Single source of truth for company info, contact, and SEO.

export const SITE = {
    name: "C&F Bouw",
    legalName: "Connect Diensten V.O.F.",
    kvk: "97394297",
    domain: "www.cfbouw.nl",
    region: "Apeldoorn en omgeving",
    logo: "/cfbouw/webassets/CFLogo.webp",

    contact: {
        email: "info@cfbouw.nl",
        emailHref: "mailto:info@cfbouw.nl",
        whatsapp: "06 13 96 31 56",
        whatsappHref: "https://wa.me/31613963156",
        phone: "06 13 96 31 56",
        phoneHref: "tel:+31613963156",
    },

    seo: {
        title: "Kunststof kozijnen & schuifpuien | C&F Bouw",
        description:
            "C&F Bouw is gespecialiseerd in het leveren en monteren van hoogwaardige kunststof kozijnen, deuren en schuifpuien. Schüco kwaliteit, vakkundige montage in Apeldoorn en omgeving.",
        ogImage: "/og-image.jpg",
    },

    nav: [
        { label: "Diensten", href: "#diensten" },
        { label: "Producten", href: "#producten" },
        { label: "Over Ons", href: "#over-ons" },
        { label: "Werkwijze", href: "#werkwijze" },
        { label: "Keurmerken", href: "#keurmerken" },
        { label: "Contact", href: "#contact" },
    ],

    cta: {
        primary: { label: "Offerte Aanvragen", href: "#contact" },
        secondary: { label: "Bel Direct", href: "tel:+31613963156" },
        whatsapp: { label: "WhatsApp", href: "https://wa.me/31613963156" },
        showroom: { label: "Showroom Bezoeken", href: "#contact" },
    },

    hero: {
        badge: "Specialist in Kunststof Kozijnen",
        titleLine1: "Kunststof kozijnen,",
        titleLine2: "deuren & schuifpuien",
        subtitle:
            "C&F Bouw is gespecialiseerd in het leveren en monteren van kunststof kozijnen, deuren en schuifpuien. Wij werken uitsluitend met Schüco — vakkundig geleverd en gemonteerd in de regio Apeldoorn.",
        stats: [
            { value: "Schüco", label: "Kwaliteitsmerk" },
            { value: "100%", label: "Maatwerk" },
            { value: "Snel", label: "Levering & Montage" },
        ],
    },

    overOns: {
        tagline: "Over Ons",
        title: "Vakmanschap met een persoonlijke aanpak",
        paragraphs: [
            "C&F Bouw is gespecialiseerd in het leveren en monteren van hoogwaardige kozijnen voor zowel particuliere als zakelijke klanten. Wij combineren vakmanschap met zorgvuldig geselecteerde producten en werken uitsluitend samen met betrouwbare fabrikanten die voldoen aan de geldende kwaliteitseisen.",
            "Door korte lijnen met onze leveranciers en een efficiënte werkwijze kunnen wij maatwerkoplossingen bieden die passen bij iedere woning of project. Van advies en inmeten tot montage en oplevering: wij begeleiden het volledige traject met aandacht voor detail en een heldere communicatie.",
            "Bij C&F Bouw staan duurzaamheid, veiligheid en afwerking centraal. Wij geloven dat goede kozijnen niet alleen bijdragen aan het comfort en de uitstraling van een pand, maar ook aan energiebesparing en woonveiligheid op de lange termijn.",
        ],
        features: [
            "Snelle offerte & levering",
            "Persoonlijke begeleiding",
            "Transparante communicatie",
            "Schüco kwaliteitsgarantie",
        ],
    },

    missie: {
        title: "Onze Missie",
        text: "Onze missie is het leveren en monteren van hoogwaardige kunststof kozijnen, deuren en schuifpuien tegen eerlijke en concurrerende prijzen. Wij streven naar een soepel proces waarin kwaliteit, service en klanttevredenheid centraal staan.",
    },

    visie: {
        title: "Onze Visie",
        text: "C&F Bouw wil een betrouwbare en herkenbare partner zijn op het gebied van kunststof kozijnen en montage. Door te werken met sterke merken, vakmanschap en een transparante werkwijze bouwen wij aan langdurige relaties met onze klanten.",
    },

    schuco: {
        tagline: "Ons Merk",
        title: "Schüco — kwaliteit zonder compromis",
        description:
            "C&F Bouw werkt uitsluitend met Schüco, een wereldwijd erkend merk en koploper in de kunststof kozijnenbranche.",
        features: [
            "Uitstekende isolatiewaarden",
            "Hoogwaardige afwerking",
            "Duurzame en onderhoudsarme systemen",
            "Lange levensduur en betrouwbaarheid",
        ],
        closing:
            "Door te kiezen voor Schüco bieden wij onze klanten kwaliteit en comfort voor de lange termijn.",
    },

    footer: {
        legalLine: "C&F Bouw is een onderdeel van Connect Diensten V.O.F.",
        kvkLine: "KvK-nummer: 97394297",
    },
} as const;
