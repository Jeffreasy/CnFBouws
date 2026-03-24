// ─── C&F Bouw — ImageKit Image Registry ──────────────────
// Single source of truth for all image paths and metadata.
// All paths are relative to the ImageKit base URL.
//
// Add new images here and reference them in components via:
//   import { IMAGES } from "../data/images";

export interface ImageEntry {
    /** Path on ImageKit (relative, starts with /) */
    src: string;
    /** Required alt text for accessibility */
    alt: string;
    /** Optional label shown in UI overlays or captions */
    label?: string;
}

// ─── Hero ─────────────────────────────────────────────────
export const HERO_IMAGE: ImageEntry = {
    src: "/cfbouw/webassets/Gemini_Generated_Image_5umn405umn405umn.jfif",
    alt: "C&F Bouw — Professionele montage van kunststof kozijnen en deuren op maat",
};

// ─── Referenties (uitbreidbaar) ───────────────────────────
// Voeg hier toekomstige referentie-foto's toe.
export const REFERENTIE_IMAGES: ImageEntry[] = [
    // { src: "/cfbouw/referenties/project-1.jpg", alt: "Kozijnen project woning", label: "Kozijnen" },
];

// ─── Producten (uitbreidbaar) ─────────────────────────────
// Optioneel: koppel een afbeelding aan elke productcategorie.
export const PRODUCT_IMAGES: Record<string, ImageEntry> = {
    // kozijnen: { src: "/cfbouw/producten/kozijn.jpg", alt: "Kunststof kozijn" },
    // deuren:   { src: "/cfbouw/producten/deur.jpg",   alt: "Kunststof deur"   },
};
