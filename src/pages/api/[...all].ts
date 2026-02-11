// src/pages/api/[...all].ts
// Universal BFF Proxy — All client-side requests go via /api/* → backend
// Keeps cookies on the same domain for security

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
