export { renderers } from '../../renderers.mjs';

const prerender = false;
const API_URL = "https://laventecareauthsystems.onrender.com/api/v1";
const ALL = async ({ request, params, cookies }) => {
  const path = params.all;
  if (!path) return new Response("Not Found", { status: 404 });
  let cleanPath = path;
  if (API_URL.endsWith("/v1") && cleanPath.startsWith("v1/")) {
    cleanPath = cleanPath.substring(3);
  }
  if (cleanPath.startsWith("/")) cleanPath = cleanPath.substring(1);
  const targetUrl = `${API_URL}/${cleanPath}`;
  try {
    const token = cookies.get("access_token")?.value;
    const headers = new Headers(request.headers);
    headers.set("Host", new URL(API_URL).host);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const tenantID = "3b542934-6ac6-42b2-9511-a09e6cff8c80";
    headers.set("X-Tenant-ID", tenantID);
    let body = void 0;
    if (request.method !== "GET") {
      body = await request.clone().text();
    }
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body
    });
    const responseText = await response.text();
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("set-cookie");
    return new Response(responseText, {
      status: response.status,
      headers: responseHeaders
    });
  } catch (e) {
    console.error("API Proxy Error:", e);
    return new Response(JSON.stringify({ error: "Backend unreachable" }), { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
