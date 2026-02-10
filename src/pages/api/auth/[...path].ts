// src/pages/api/auth/[...path].ts
// Auth Proxy — Handles login, logout, refresh, register with cookie management

import type { APIRoute } from 'astro';

export const prerender = false;

const API_URL = import.meta.env.PUBLIC_API_URL
    || "https://laventecareauthsystems.onrender.com/api/v1";
const TENANT_ID = import.meta.env.PUBLIC_TENANT_ID
    || "3b542934-6ac6-42b2-9511-a09e6cff8c80";

export const ALL: APIRoute = async ({ request, params, cookies }) => {
    const path = params.path;
    const targetUrl = `${API_URL}/auth/${path}`;

    // ── LOGIN INTERCEPT ─────────────────────────────────────
    if (path === 'login' && request.method === 'POST') {
        try {
            const body = await request.json();
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-ID': TENANT_ID
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                return new Response(await response.text(), { status: response.status });
            }

            const data = await response.json();
            const responseHeaders = new Headers();
            responseHeaders.set('Content-Type', 'application/json');

            // Forward & sanitize Set-Cookie headers
            const cookiesToSet = typeof response.headers.getSetCookie === 'function'
                ? response.headers.getSetCookie()
                : [response.headers.get('set-cookie')].filter(Boolean) as string[];

            cookiesToSet.forEach(cookie => {
                let adjusted = cookie
                    .replace(/SameSite=[a-zA-Z]+/gi, 'SameSite=Lax')
                    .replace(/; Partitioned/gi, '');
                if (!import.meta.env.PROD) {
                    adjusted = adjusted.replace(/; Secure/gi, '');
                }
                responseHeaders.append('Set-Cookie', adjusted);
            });

            // Strip sensitive fields
            const { access_token, token: _, ...safeData } = data;
            const user = safeData.user || safeData.User || safeData;
            delete user.PasswordHash;
            delete user.MfaSecret;

            return new Response(JSON.stringify(safeData), {
                status: 200,
                headers: responseHeaders
            });
        } catch (error) {
            console.error("Login Proxy Error:", error);
            return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        }
    }

    // ── TOKEN RETRIEVAL (for React Islands) ─────────────────
    if (path === 'token' && request.method === 'GET') {
        const token = cookies.get("access_token")?.value;
        if (token) {
            return new Response(JSON.stringify({ token }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(JSON.stringify({ error: "No session" }), { status: 401 });
    }

    // ── LOGOUT ──────────────────────────────────────────────
    if (path === 'logout') {
        const token = cookies.get("access_token")?.value;
        if (token) {
            try {
                await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Tenant-ID': TENANT_ID
                    }
                });
            } catch (_) { /* Non-blocking */ }
        }
        cookies.delete('access_token', { path: '/' });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // ── GENERIC AUTH PROXY (register, forgot-password, etc) ─
    try {
        const token = cookies.get("access_token")?.value;
        const headers = new Headers(request.headers);
        headers.delete('origin');
        headers.delete('referer');
        headers.delete('host');

        if (token) headers.set("Authorization", `Bearer ${token}`);
        headers.set("X-Tenant-ID", TENANT_ID);

        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body: request.method !== 'GET' ? request.clone().body as any : undefined,
            duplex: 'half'
        } as any);

        const newHeaders = new Headers(response.headers);
        newHeaders.delete('content-encoding');
        newHeaders.delete('content-length');

        // Forward sanitized cookies
        const setCookies = typeof response.headers.getSetCookie === 'function'
            ? response.headers.getSetCookie()
            : [response.headers.get('set-cookie')].filter(Boolean) as string[];
        newHeaders.delete('set-cookie');

        setCookies.forEach(cookie => {
            let adjusted = cookie
                .replace(/SameSite=[a-zA-Z]+/gi, 'SameSite=Lax')
                .replace(/; Partitioned/gi, '');
            if (!import.meta.env.PROD) {
                adjusted = adjusted.replace(/; Secure/gi, '');
            }
            newHeaders.append('set-cookie', adjusted);
        });

        return new Response(response.body, {
            status: response.status,
            headers: newHeaders
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Proxy Failed" }), { status: 500 });
    }
};
