/// <reference path="../.astro/types.d.ts" />

declare namespace App {
    interface Locals {
        token: string | null;
        user: { id: string; email: string; role: string; full_name?: string } | null;
    }
}
