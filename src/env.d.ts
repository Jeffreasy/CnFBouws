/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
    readonly PUBLIC_TENANT_ID: string;
    readonly PUBLIC_IMAGEKIT_URL: string;
    readonly IMAGEKIT_PUBLIC_KEY: string;
    readonly IMAGEKIT_PRIVATE_KEY: string;
    readonly RESEND_API_KEY: string;
    readonly CONTACT_EMAIL: string;
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
