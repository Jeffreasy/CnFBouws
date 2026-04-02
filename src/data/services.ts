// ─── C&F Bouw — Services & Werkwijze Data ────────────────

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string; // SVG path reference
}

export interface WerkwijzeStep {
    step: number;
    title: string;
    description: string;
    icon: string;
}

// ─── Diensten ────────────────────────────────────────────
export const SERVICES: Service[] = [
    {
        id: "advies",
        title: "Advies op maat",
        description:
            "Persoonlijk advies afgestemd op uw wensen, situatie en budget. Wij denken graag met u mee over de beste oplossing.",
        icon: "message-circle",
    },
    {
        id: "inmeten",
        title: "Inmeten op locatie",
        description:
            "Nauwkeurig inmeten bij u thuis of op locatie. Zo garanderen wij een perfecte pasvorm voor elk kozijn, deur of schuifpui.",
        icon: "ruler",
    },
    {
        id: "kozijnen",
        title: "Levering kunststof kozijnen",
        description:
            "Hoogwaardige Schüco kunststof kozijnen op maat, voorzien van HR++ of HR+++ isolatieglas. Geschikt voor zowel nieuwbouw als het vervangen van bestaande kozijnen.",
        icon: "square",
    },
    {
        id: "deuren",
        title: "Levering kunststof deuren",
        description:
            "Veilige en goed isolerende kunststof deuren voor zowel voor- als achtergevels, in diverse stijlen.",
        icon: "door-open",
    },
    {
        id: "schuifpuien",
        title: "Levering schuifpuien",
        description:
            "Ruimtelijke schuifpuien voor meer licht en een moderne uitstraling. Soepele bediening gegarandeerd.",
        icon: "panels-top-left",
    },
    {
        id: "montage",
        title: "Professionele montage",
        description:
            "Vakkundige montage en plaatsing door ervaren vakmensen. Nette afwerking en oplevering inclusief. Snel en betrouwbaar.",
        icon: "wrench",
    },
    {
        id: "oplevering",
        title: "Nette en zorgvuldige oplevering",
        description:
            "Na montage controleren wij alles en leveren wij het werk netjes op. Pas als u tevreden bent, is het project afgerond.",
        icon: "check-circle",
    },
];

// ─── Werkwijze (4-staps proces) ──────────────────────────
export const WERKWIJZE: WerkwijzeStep[] = [
    {
        step: 1,
        title: "Afspraak maken",
        description:
            "Neem contact met ons op. Wij plannen een afspraak op locatie of in onze showroom.",
        icon: "calendar",
    },
    {
        step: 2,
        title: "Inmeten & advies",
        description:
            "Wij meten alles nauwkeurig in en bespreken de mogelijkheden die het beste bij uw situatie passen.",
        icon: "ruler",
    },
    {
        step: 3,
        title: "Offerte",
        description:
            "U ontvangt een heldere en transparante offerte, zonder verrassingen. Snelle reactie gegarandeerd.",
        icon: "file-text",
    },
    {
        step: 4,
        title: "Montage & oplevering",
        description:
            "Na akkoord zorgen wij voor een vakkundige montage en nette afwerking. Snel en betrouwbaar.",
        icon: "check-circle",
    },
];

// ─── USPs (Unique Selling Points) ────────────────────────
export const USP_LIST = [
    {
        title: "Snelle offerte",
        description: "Snel antwoord en offerte op maat",
        icon: "zap",
    },
    {
        title: "Snelle levering",
        description: "Snelle levering en vakkundige montage",
        icon: "truck",
    },
    {
        title: "Schüco kwaliteit",
        description: "Uitsluitend Schüco — kwaliteit zonder compromis",
        icon: "shield-check",
    },
    {
        title: "Maatwerk",
        description: "Maatwerkoplossingen voor elke woning of project",
        icon: "settings",
    },
] as const;
