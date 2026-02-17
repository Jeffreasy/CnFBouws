// src/lib/rateLimit.ts
// In-memory sliding window rate limiter for serverless endpoints.
// State resets on cold start (acceptable for Vercel functions).

interface RateLimitEntry {
    timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Auto-cleanup interval (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;

    const cutoff = now - windowMs;
    for (const [key, entry] of store) {
        entry.timestamps = entry.timestamps.filter(t => t > cutoff);
        if (entry.timestamps.length === 0) store.delete(key);
    }
}

/**
 * Check if a request should be rate-limited.
 *
 * @param key       — Unique identifier (typically client IP)
 * @param maxHits   — Max requests allowed in the window (default: 5)
 * @param windowMs  — Window duration in ms (default: 15 minutes)
 * @returns { limited: boolean, remaining: number, retryAfterMs?: number }
 */
export function checkRateLimit(
    key: string,
    maxHits = 5,
    windowMs = 15 * 60 * 1000,
): { limited: boolean; remaining: number; retryAfterMs?: number } {
    cleanup(windowMs);

    const now = Date.now();
    const cutoff = now - windowMs;

    let entry = store.get(key);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(key, entry);
    }

    // Remove expired timestamps
    entry.timestamps = entry.timestamps.filter(t => t > cutoff);

    if (entry.timestamps.length >= maxHits) {
        const oldestInWindow = entry.timestamps[0];
        const retryAfterMs = oldestInWindow + windowMs - now;
        return { limited: true, remaining: 0, retryAfterMs };
    }

    entry.timestamps.push(now);
    return { limited: false, remaining: maxHits - entry.timestamps.length };
}
