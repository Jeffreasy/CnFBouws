# 02. Data, State & Integration

## 1. Zero-Trust API Proxy & Middleware

Security is the primary directive. `CnFBouws` validates external payload integrity securely through two mechanisms:

### The Astro Middleware (`middleware.ts`)
A global intercept layer processes every request not defined as a static asset. It is engineered to extract `access_token` cookies securely without executing arbitrary client logic. Currently configured to validate JWT sessions structurally with the `LaventeCare AuthSystem` prior to unlocking protected paths, acting as a "Zero-Trust" shield.

### The Backend-for-Frontend (BFF) Pattern
All sensitive user operations (e.g., submitting contact forms) hit specific internal API coordinates like `src/pages/api/contact.ts`. 

## 2. Forms & The Dual-Email Dispatch System

As of **April 2026**, direct manipulation of external transactional email keys (like `RESEND_API_KEY`) is deprecated and removed to minimize scope compromise vectors. 

### Flow Pipeline
1. **Validation & Honeypot**: The Astro proxy receives the raw payload. It verifies strict criteria (`zod` schema logic internally) and drops bot requests caught by the hidden "website" field.
2. **LaventeCare Execution**: If pristine, the payload is piped cleanly to the **LaventeCare Backend** (`/api/v1/public/contact`), appending headers securely (`X-Tenant-ID`).
3. **Dual Dispatch**: The Go-backend assumes the heavy-lifting entirely. It parses the body and leverages pre-defined HTML configurations to emit **two identical-state events concurrently**:
   - An *Admin Notification* to C&F Bouw (`info@cfbouw.nl`).
   - A *Confirmation Reply* beautifully formatted in tenant-colors back to the customer.

## 3. Persistent Database State (Convex)

Even though emails are dispatched globally, internal analysis necessitates recording explicit data streams persistently.
- When an API request is accepted and dispatched to LaventeCare successfully, the backend proxy *simultaneously* initiates a non-blocking invocation to **Convex** (`src/lib/convex.ts`).
- Leads are pushed into the `Aanvragen` tables. This logic acts concurrently preventing the user interface from locking during standard latency.

## 4. Image CDN (ImageKit)

C&F Bouw relies heavily on high-visual assets. Shipping raw assets would negatively impact Largest Contentful Paint (LCP) limits.

### Automatic srcset and Optimization
We utilize `<IKImage />` components natively hooked directly to an **ImageKit** CDN origin:
- Assets are intercepted, compressed, and converted to `.webp` / `.avif` on the fly.
- `src/lib/imagekit.ts` maps relative parameters to structured origin domains dynamically.
- Developers declare string keys (`images.trust`) found in `src/data/images.ts`, preventing manual hardcoding URL references and automating delivery sizes exactly to browser viewport boundaries.
