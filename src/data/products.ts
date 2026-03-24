// ─── C&F Bouw — Product Data ─────────────────────────────
// Schüco profiles and product categories.

export interface SchucoProfile {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    bestFor: string;
    features: string[];
    /** Optional ImageKit path for product image */
    image?: string;
    /** Alt text for the image */
    imageAlt?: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name reference
}

// ─── Schüco Profile Lines ────────────────────────────────
export const SCHUCO_PROFILES: SchucoProfile[] = [
    {
        id: "living",
        name: "Schüco Living",
        subtitle: "Premium profiel",
        description:
            "Schüco Living is het meest hoogwaardige profiel binnen ons assortiment. Het biedt uitstekende isolatie, een moderne uitstraling en is zeer geschikt voor energiezuinige en nieuwbouwwoningen.",
        bestFor: "Nieuwbouw & energiezuinige woningen",
        features: [
            "Hoogste isolatiewaarden",
            "Moderne uitstraling",
            "Maximaal comfort",
            "Uiterst duurzaam",
        ],
        image: "/cfbouw/webassets/image-cmcid-173603--data.jpg",
        imageAlt: "Schüco Living profiel — premium kunststof kozijn",
    },
    {
        id: "ct70-accent",
        name: "Schüco CT70 Accent",
        subtitle: "Klassieke kwaliteit",
        description:
            "Schüco CT70 Accent combineert betrouwbare kwaliteit met een klassiek design. Dit profiel is een goede keuze voor renovaties en bestaande woningen waar uitstraling en prijs-kwaliteitverhouding belangrijk zijn.",
        bestFor: "Renovaties & bestaande woningen",
        features: [
            "Klassiek design",
            "Betrouwbare kwaliteit",
            "Goede prijs-kwaliteit",
            "Veelzijdig inzetbaar",
        ],
        image: "/cfbouw/webassets/grijs%20schuco%20accent%20CT%2070.jpg",
        imageAlt: "Schüco CT70 Accent profiel — grijs kunststof kozijn",
    },
    {
        id: "ct70",
        name: "Schüco Corona CT70",
        subtitle: "Veelzijdig & stevig",
        description:
            "Schüco Corona CT70 is een stevig en veelzijdig profiel met goede isolatiewaarden. Het is geschikt voor zowel nieuwbouw als renovatie en staat bekend om zijn duurzaamheid en stabiliteit.",
        bestFor: "Nieuwbouw & renovatie",
        features: [
            "Stevig & stabiel",
            "Goede isolatie",
            "Duurzaam materiaal",
            "Breed inzetbaar",
        ],
        image: "/cfbouw/webassets/schueco_CT-70-corona-accent.avif",
        imageAlt: "Schüco Corona CT70 profiel — kunststof kozijn",
    },
];

// ─── Product Categories ──────────────────────────────────
export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        id: "kozijnen",
        name: "Kunststof Kozijnen",
        description:
            "Onze kunststof kozijnen zijn duurzaam, onderhoudsarm en hebben uitstekende isolatiewaarden. Ze dragen bij aan energiebesparing en verhogen het wooncomfort.",
        icon: "square",
    },
    {
        id: "deuren",
        name: "Kunststof Deuren",
        description:
            "Wij leveren kunststof deuren die veiligheid, isolatie en design combineren. Geschikt voor zowel voor- als achterdeuren.",
        icon: "door-open",
    },
    {
        id: "schuifpuien",
        name: "Schuifpuien",
        description:
            "Onze kunststof schuifpuien zorgen voor extra licht, ruimte en een moderne uitstraling, met een soepele bediening en goede isolatie.",
        icon: "panels-top-left",
    },
    {
        id: "sierpanelen",
        name: "Sierpanelen",
        description:
            "Decoratieve sierpanelen voor een unieke afwerking van uw kozijnen en deuren. Diverse stijlen en kleuren beschikbaar.",
        icon: "layout-grid",
    },
    {
        id: "hefschuifdeur",
        name: "Hefschuifdeuren",
        description:
            "Grote schuifdeuren voor maximale openheid en een naadloze overgang tussen binnen en buiten. Soepele bediening en optimale isolatie.",
        icon: "move-horizontal",
    },
];
