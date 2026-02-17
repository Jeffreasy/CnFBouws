// ─── C&F Bouw — Keurmerken & Subsidie Data ───────────────
// ImageKit CDN base URL loaded from env
const CDN = "https://ik.imagekit.io/a0oim4e3e";

/**
 * Build optimized ImageKit URL for keurmerk logos.
 * Transforms raw uploads (up to 95KB) into ~5KB optimized images.
 */
function keurmerkUrl(path: string): string {
    return `${CDN}/tr:w-200,h-200,cm-at_max,f-auto,q-80${path}`;
}

export interface Keurmerk {
    id: string;
    name: string;
    abbreviation: string;
    description: string;
    logo: string;
}

// ─── Keurmerken & Certificeringen ────────────────────────
export const KEURMERKEN: Keurmerk[] = [
    {
        id: "komo",
        name: "KOMO-keurmerk",
        abbreviation: "KOMO",
        description:
            "Onafhankelijk kwaliteitskeurmerk dat garandeert dat producten en processen voldoen aan de geldende bouwregelgeving.",
        logo: keurmerkUrl("/cfbouw/webassets/Logo_KOMO_XL_RGB.jpg"),
    },
    {
        id: "vkg",
        name: "VKG-keurmerk",
        abbreviation: "VKG",
        description:
            "Keurmerk van de Vereniging Kunststof Gevelelementenindustrie. Staat voor kwaliteitsgarantie in kunststof kozijnen.",
        logo: keurmerkUrl("/cfbouw/webassets/VKG_logo.png"),
    },
    {
        id: "skg",
        name: "SKG-certificering",
        abbreviation: "SKG",
        description:
            "Het hang- en sluitwerk is SKG-gecertificeerd en geschikt voor het Politiekeurmerk Veilig Wonen.",
        logo: keurmerkUrl("/cfbouw/webassets/SKG_keurmerk.png"),
    },
    {
        id: "pkvw",
        name: "Politie Keurmerk Veilig Wonen",
        abbreviation: "PKVW",
        description:
            "Keurmerk dat aangeeft dat de producten voldoen aan de veiligheidseisen voor inbraakpreventie.",
        logo: keurmerkUrl(
            "/cfbouw/webassets/cropped-Politie-veilig-wonen-keurmerk-1.jpg"
        ),
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
