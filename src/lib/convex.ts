/**
 * src/lib/convex.ts
 * Server-side Convex HTTP client for Astro API routes.
 *
 * Uses ConvexHttpClient (not the React browser client) —
 * safe to import in Astro server endpoints and API routes.
 *
 * NOTE: We use anyApi here so the project builds before
 * `npx convex dev` has generated the typed API files.
 * After running `npx convex dev` once, you can replace
 * anyApi with the generated `api` for full type safety.
 */
import { ConvexHttpClient } from "convex/browser";
import { anyApi }           from "convex/server";

export { anyApi as api };

/**
 * getConvexClient — returns a configured ConvexHttpClient.
 * Throws immediately if CONVEX_URL is missing.
 */
export function getConvexClient(): ConvexHttpClient {
    const url = import.meta.env.CONVEX_URL;
    if (!url) {
        throw new Error("[Convex] CONVEX_URL is not set in environment variables");
    }
    return new ConvexHttpClient(url);
}
