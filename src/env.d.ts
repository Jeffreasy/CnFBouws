/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
    readonly PUBLIC_TENANT_ID: string;
    readonly PUBLIC_IMAGEKIT_URL: string;
    readonly IMAGEKIT_PUBLIC_KEY: string;
    readonly IMAGEKIT_PRIVATE_KEY: string;
    // Email dispatch: handled by LaventeCare AuthSystem backend (PUBLIC_API_URL)
    // RESEND_API_KEY and CONTACT_EMAIL removed — no longer needed
    readonly CONVEX_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace App {
    interface Locals {
        token: string | null;
        user: { id: string; email: string; role: string; full_name?: string } | null;
    }
}
