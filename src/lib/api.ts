// src/lib/api.ts
// Client-side API utility for React islands
// Provides automatic 401 → refresh → retry flow

const API_URL = "/api";
const TENANT_ID = import.meta.env.PUBLIC_TENANT_ID
    || "3b542934-6ac6-42b2-9511-a09e6cff8c80";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");
    headers.set("X-Tenant-ID", TENANT_ID);

    let res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });

    // Auto-refresh on 401 (skip for login attempts)
    if (res.status === 401 && !endpoint.includes("/auth/login")) {
        try {
            const refreshRes = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: { "X-Tenant-ID": TENANT_ID },
                credentials: "include"
            });

            if (refreshRes.ok) {
                res = await fetch(`${API_URL}${endpoint}`, {
                    ...options, headers, credentials: "include",
                });
            } else {
                throw new Error("Session expired");
            }
        } catch (e) {
            window.location.href = "/login?expired=true";
            throw e;
        }
    }

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Onbekende fout" }));
        throw new Error(err.error || `Request failed: ${res.status}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : {};
}
