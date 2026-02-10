// src/middleware.ts
// Zero-Trust SSR Middleware — Session validation on every request

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
