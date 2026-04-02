// ─── C&F Bouw — Centralized Site Data ────────────────────
// Single source of truth for company info, contact, and SEO.

export const SITE = {
    name: "C&F Bouw",
    legalName: "Connect Diensten V.O.F.",
    kvk: "97394297",
    domain: "www.cfbouw.nl",
    region: "Gelderland, Overijssel en omstreken",
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
        title: "Kunststof kozijnen & schuifpuien | C&F Bouw Apeldoorn",
        description:
            "C&F Bouw levert en monteert Schüco kunststof kozijnen, deuren en schuifpuien in Gelderland en Overijssel. Vakkundige montage, persoonlijk advies.",
        ogImage: "https://ik.imagekit.io/a0oim4e3e/cfbouw/webassets/CFLogo.webp?tr=w-1200,h-630,f-jpg",
    },

    nav: [
        { label: "Diensten", href: "#diensten" },
        { label: "Producten", href: "#producten" },
        { label: "Werkwijze", href: "#werkwijze" },
        { label: "Over Ons", href: "#over-ons" },
        { label: "Keurmerken", href: "#keurmerken" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
    ],

    cta: {
        primary: { label: "Offerte Aanvragen", href: "#contact" },
        secondary: { label: "Bel Direct", href: "tel:+31613963156" },
        whatsapp: { label: "WhatsApp", href: "https://wa.me/31613963156" },
        showroom: { label: "Showroom Bezoeken", href: "#contact" },
    },

    hero: {
        badge: "Uw kozijnspecialist in de regio",
        titleLine1: "Kunststof kozijnen,",
        titleLine2: "deuren & schuifpuien",
        subtitle:
            "C&F Bouw verzorgt het complete traject — van advies en opmeten tot vakkundige montage en nette oplevering. Persoonlijk, snel en betrouwbaar in Gelderland, Overijssel en omstreken.",
        stats: [
            { value: "100%", label: "Schüco kwaliteit" },
            { value: "10+", label: "Regio's bediend" },
            { value: "4", label: "Keurmerken" },
        ],
    },

    overOns: {
        tagline: "Over Ons",
        title: "Vakmanschap met een persoonlijke aanpak",
        paragraphs: [
            "C&F Bouw is uw kozijnspecialist voor het leveren, plaatsen en vervangen van hoogwaardige kunststof kozijnen — voor zowel particuliere als zakelijke klanten. Wij combineren vakmanschap met zorgvuldig geselecteerde producten en werken uitsluitend samen met betrouwbare fabrikanten die voldoen aan de geldende kwaliteitseisen.",
            "Door korte lijnen met onze leveranciers en een efficiënte werkwijze kunnen wij maatwerkoplossingen bieden die passen bij iedere woning of project. Van advies en inmeten tot montage en oplevering: wij begeleiden het volledige traject met aandacht voor detail en een heldere communicatie.",
            "Bij C&F Bouw staan duurzaamheid, veiligheid en afwerking centraal. Wij geloven dat goede kozijnen niet alleen bijdragen aan het comfort en de uitstraling van een pand, maar ook aan energiebesparing en woonveiligheid op de lange termijn. Op al onze producten geldt de fabrieksgarantie van Schüco.",
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
