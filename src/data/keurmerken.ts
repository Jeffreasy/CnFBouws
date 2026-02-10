// ─── C&F Bouw — Keurmerken & Subsidie Data ───────────────

export interface Keurmerk {
    id: string;
    name: string;
    abbreviation: string;
    description: string;
}

// ─── Keurmerken & Certificeringen ────────────────────────
export const KEURMERKEN: Keurmerk[] = [
    {
        id: "komo",
        name: "KOMO-keurmerk",
        abbreviation: "KOMO",
        description:
            "Onafhankelijk kwaliteitskeurmerk dat garandeert dat producten en processen voldoen aan de geldende bouwregelgeving.",
    },
    {
        id: "vkg",
        name: "VKG-keurmerk",
        abbreviation: "VKG",
        description:
            "Keurmerk van de Vereniging Kunststof Gevelelementenindustrie. Staat voor kwaliteitsgarantie in kunststof kozijnen.",
    },
    {
        id: "skg",
        name: "SKG-certificering",
        abbreviation: "SKG",
        description:
            "Het hang- en sluitwerk is SKG-gecertificeerd en geschikt voor het Politiekeurmerk Veilig Wonen.",
    },
    {
        id: "pkvw",
        name: "Politie Keurmerk Veilig Wonen",
        abbreviation: "PKVW",
        description:
            "Keurmerk dat aangeeft dat de producten voldoen aan de veiligheidseisen voor inbraakpreventie.",
    },
];

// ─── Subsidie Informatie ─────────────────────────────────
export const SUBSIDIE = {
    title: "ISDE-subsidie",
    tagline: "Subsidie mogelijk",
    description:
        "Onze kozijnen en deuren voldoen aan alle technische eisen voor ISDE-subsidie. Wij leveren alle benodigde documenten, zodat u als klant eenvoudig zelf de subsidie kunt aanvragen.",
    note: "De producten voldoen aan de eisen voor subsidieaanvragen.",
} as const;

// ─── Trust Statement ─────────────────────────────────────
export const TRUST_STATEMENT =
    "Bij C&F Bouw werken wij uitsluitend samen met betrouwbare en gecertificeerde fabrikanten. De producten die wij leveren voldoen aan hoge kwaliteitseisen en worden geproduceerd volgens de geldende normen binnen de branche.";
