import { d as defineMiddleware, s as sequence } from './chunks/index_Dr2VxdWA.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Cj8i4i9J.mjs';
import 'piccolore';
import './chunks/astro/server_DfgM8LhM.mjs';
import 'clsx';

const API_URL = "https://laventecareauthsystems.onrender.com/api/v1";
const TENANT_ID = "3b542934-6ac6-42b2-9511-a09e6cff8c80";
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, cookies, redirect, locals } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/_astro") || url.pathname.startsWith("/api/auth") || url.pathname.includes(".")) {
    return next();
  }
  const token = cookies.get("access_token")?.value;
  let user = null;
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
  locals.token = token || null;
  locals.user = user || null;
  const protectedRoutes = ["/admin", "/dashboard", "/profile"];
  const isProtected = protectedRoutes.some((p) => url.pathname.startsWith(p));
  if (isProtected && !locals.user) {
    return redirect("/login");
  }
  if (url.pathname.startsWith("/admin") && locals.user?.role !== "admin" && locals.user?.role !== "editor") {
    return redirect("/dashboard");
  }
  const response = await next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
