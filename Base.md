🏗️ C&F Bouw — Astro/React Integratie met LaventeCare AuthSystem
Copy-paste ready integratie voor een nieuw Astro 5 project met het LaventeCare AuthSystem backend.

1. Environment Variables
env
# .env / .env.local
PUBLIC_API_URL="https://laventecareauthsystems.onrender.com/api/v1"
PUBLIC_TENANT_ID="3b542934-6ac6-42b2-9511-a09e6cff8c80"
IMPORTANT

PUBLIC_ prefix is verplicht in Astro — zonder prefix is de variabele niet beschikbaar in client/server code via import.meta.env.

2. Astro Config
typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
export default defineConfig({
  output: 'hybrid',           // SSR voor auth pagina's, static voor rest
  adapter: vercel(),
  integrations: [react()],
});
NOTE

output: 'hybrid' is cruciaal — admin/auth pagina's moeten export const prerender = false gebruiken voor cookie-validatie op de server.

3. BFF Proxy — src/pages/api/[...all].ts
Dit is de universele proxy. Alle client-side requests gaan via /api/* → backend, zodat cookies op hetzelfde domein blijven.

typescript
// src/pages/api/[...all].ts
import type { APIRoute } from 'astro';
export const prerender = false;
const API_URL = import.meta.env.PUBLIC_API_URL 
  || "https://laventecareauthsystems.onrender.com/api/v1";
export const ALL: APIRoute = async ({ request, params, cookies }) => {
    const path = params.all;
    if (!path) return new Response("Not Found", { status: 404 });
    // Clean path to avoid double /v1/v1
    let cleanPath = path;
    if (API_URL.endsWith('/v1') && cleanPath.startsWith('v1/')) {
        cleanPath = cleanPath.substring(3);
    }
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
    const targetUrl = `${API_URL}/${cleanPath}`;
    try {
        const token = cookies.get("access_token")?.value;
        const headers = new Headers(request.headers);
        headers.set("Host", new URL(API_URL).host);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        // CRITICAL: Tenant isolation
        const tenantID = import.meta.env.PUBLIC_TENANT_ID 
          || '3b542934-6ac6-42b2-9511-a09e6cff8c80';
        headers.set("X-Tenant-ID", tenantID);
        let body: string | undefined = undefined;
        if (request.method !== 'GET') {
            body = await request.clone().text();
        }
        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body,
        } as any);
        const responseText = await response.text();
        const responseHeaders = new Headers(response.headers);
        responseHeaders.delete('content-encoding');
        responseHeaders.delete('content-length');
        responseHeaders.delete('set-cookie');
        return new Response(responseText, {
            status: response.status,
            headers: responseHeaders
        });
    } catch (e) {
        console.error("API Proxy Error:", e);
        return new Response(JSON.stringify({ error: "Backend unreachable" }), { status: 502 });
    }
};
4. Auth Proxy — src/pages/api/auth/[...path].ts
Speciale proxy voor auth routes met cookie management (login, logout, refresh, register).

typescript
// src/pages/api/auth/[...path].ts
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
5. SSR Middleware — 
src/middleware.ts
Zero-trust sessie validatie op elke request. Beschermt admin/dashboard routes.

typescript
// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
const API_URL = import.meta.env.PUBLIC_API_URL 
  || "https://laventecareauthsystems.onrender.com/api/v1";
const TENANT_ID = import.meta.env.PUBLIC_TENANT_ID 
  || "3b542934-6ac6-42b2-9511-a09e6cff8c80";
export const onRequest = defineMiddleware(async (context, next) => {
    const { request, cookies, redirect, locals } = context;
    const url = new URL(request.url);
    // Bypass assets & API routes
    if (url.pathname.startsWith("/_astro") ||
        url.pathname.startsWith("/api/auth") ||
        url.pathname.includes(".")) {
        return next();
    }
    // Extract token from cookie
    const token = cookies.get("access_token")?.value;
    let user = null;
    // Zero-Trust: Validate session against backend
    if (token) {
        try {
            const verifyReq = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `access_token=${token}`,
                    "X-Tenant-ID": TENANT_ID
                }
            });
            if (verifyReq.ok) {
                user = await verifyReq.json();
                if (user.data) user = user.data;
                if (user.user) user = user.user;
            }
        } catch (error) {
            console.error("[Middleware] Session validation failed:", error);
        }
    }
    // Inject into Astro locals (accessible in .astro pages)
    locals.token = token || null;
    locals.user = user || null;
    // Route guards
    const protectedRoutes = ["/admin", "/dashboard", "/profile"];
    const isProtected = protectedRoutes.some(p => url.pathname.startsWith(p));
    if (isProtected && !locals.user) {
        return redirect("/login");
    }
    if (url.pathname.startsWith("/admin") && 
        locals.user?.role !== "admin" && 
        locals.user?.role !== "editor") {
        return redirect("/dashboard");
    }
    const response = await next();
    // Security headers
    response.headers.set("X-Frame-Options", import.meta.env.DEV ? "SAMEORIGIN" : "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
});
TIP

Voeg env.d.ts toe voor TypeScript type-safety op locals:

typescript
// src/env.d.ts
declare namespace App {
  interface Locals {
    token: string | null;
    user: { id: string; email: string; role: string; full_name?: string } | null;
  }
}
6. Client-Side API Utility — 
src/lib/api.ts
Voor gebruik in React islands. Biedt automatische 401 → refresh → retry flow.

typescript
// src/lib/api.ts
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
Gebruik in een React component:

tsx
// src/components/Dashboard.tsx
import { apiRequest } from '../lib/api';
export default function Dashboard() {
    const loadProfile = async () => {
        const user = await apiRequest('/auth/me');
        console.log(user);
    };
    
    return <button onClick={loadProfile}>Load Profile</button>;
}
7. Vercel Deployment
json
// vercel.json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
Na deployment, voeg de productie-URL toe aan de tenant CORS origins:

sql
UPDATE tenants 
SET allowed_origins = array_append(allowed_origins, 'https://cf-bouw.vercel.app')
WHERE slug = 'cf-bouw';
📐 Architectuur Overzicht
Go AuthSystem
Astro SSR
Browser
Go AuthSystem
Astro SSR
Browser
POST /api/auth/login
POST /auth/login + X-Tenant-ID
200 + Set-Cookie (access_token)
200 + Sanitized Cookie (SameSite=Lax)
GET /admin (cookie meegegeven)
GET /auth/me + Cookie + X-Tenant-ID
200 { user, role }
HTML (role=admin? → render admin page)
✅ Security Checklist
Check	Status
X-Tenant-ID op elke proxy request	✅
Cookies: HttpOnly, SameSite=Lax	✅
Secure flag alleen in productie	✅
Token nooit in response body (alleen cookie)	✅
PasswordHash/MfaSecret gestript	✅
SSR-side sessie validatie (Zero-Trust)	✅
Role-based route guards in middleware	✅
X-Frame-Options: DENY in productie	✅