// ─── C&F Bouw — ImageKit CDN Configuration ───────────────
// Centralized helper for building optimized image URLs.
// Uses the PUBLIC_IMAGEKIT_URL env var as the base endpoint.
//
// Usage:
//   import { ikUrl, ikImage } from "../lib/imagekit";
//   const url = ikUrl("/hero/banner.jpg", { w: 1200, q: 80 });

const IMAGEKIT_BASE =
    import.meta.env.PUBLIC_IMAGEKIT_URL || "https://ik.imagekit.io/a0oim4e3e";

/**
 * ImageKit transformation parameters
 */
export interface IKTransform {
    /** Width in pixels */
    w?: number;
    /** Height in pixels */
    h?: number;
    /** Quality 1-100 */
    q?: number;
    /** Focus area: auto, face, center, etc */
    fo?: "auto" | "face" | "center" | "top" | "bottom";
    /** Blur 1-100 */
    bl?: number;
    /** Format: auto, webp, avif, jpg, png */
    f?: "auto" | "webp" | "avif" | "jpg" | "png";
    /** Crop mode */
    cm?: "maintain_ratio" | "force" | "at_least" | "at_max";
    /** Progressive loading */
    pr?: boolean;
    /** Named transformation */
    n?: string;
}

/**
 * Build an ImageKit URL with optional transformations.
 *
 * @param path — Image path on ImageKit (e.g. "/hero/banner.jpg")
 * @param transforms — Optional transformation parameters
 * @returns Full ImageKit URL with transforms applied
 *
 * @example
 * ikUrl("/hero/banner.jpg")
 * // → https://ik.imagekit.io/a0oim4e3e/hero/banner.jpg
 *
 * ikUrl("/hero/banner.jpg", { w: 800, q: 80, f: "auto" })
 * // → https://ik.imagekit.io/a0oim4e3e/tr:w-800,q-80,f-auto/hero/banner.jpg
 */
export function ikUrl(path: string, transforms?: IKTransform): string {
    // Ensure path starts with /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    if (!transforms || Object.keys(transforms).length === 0) {
        return `${IMAGEKIT_BASE}${cleanPath}`;
    }

    // Build transformation string
    const parts: string[] = [];
    for (const [key, value] of Object.entries(transforms)) {
        if (value === undefined || value === null) continue;
        if (key === "pr") {
            if (value) parts.push("pr-true");
        } else {
            parts.push(`${key}-${value}`);
        }
    }

    const trString = parts.join(",");
    return `${IMAGEKIT_BASE}/tr:${trString}${cleanPath}`;
}

/**
 * Generate a responsive srcset for an image.
 *
 * @param path — Image path on ImageKit
 * @param widths — Array of widths for srcset
 * @param baseTransforms — Additional transforms applied to all sizes
 * @returns srcset string for use in <img> or <source>
 *
 * @example
 * ikSrcSet("/hero/banner.jpg", [400, 800, 1200])
 * // → ".../tr:w-400,f-auto/hero/banner.jpg 400w, .../tr:w-800,f-auto/hero/banner.jpg 800w, ..."
 */
export function ikSrcSet(
    path: string,
    widths: number[] = [400, 800, 1200, 1600],
    baseTransforms: Omit<IKTransform, "w"> = { f: "auto", q: 80 }
): string {
    return widths
        .map((w) => `${ikUrl(path, { ...baseTransforms, w })} ${w}w`)
        .join(", ");
}

/**
 * Generate a low-quality placeholder (LQIP) URL for blur-up loading.
 *
 * @param path — Image path on ImageKit
 * @returns Tiny blurred placeholder URL
 */
export function ikPlaceholder(path: string): string {
    return ikUrl(path, { w: 30, q: 20, bl: 6, f: "webp" });
}
