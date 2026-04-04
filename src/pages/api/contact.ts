// src/pages/api/contact.ts
// Server endpoint for contact form submissions.
// Pipeline: validate → rate-limit → honeypot → LaventeCare backend (dual-email dispatch) → persist to Convex
//
// Migration (April 2026): Replaced Resend API with LaventeCare AuthSystem backend.
// The Go backend handles:
//   - Admin notification → info@cfbouw.nl (via mail_config.admin_email)
//   - User confirmation  → customer email (TemplateContactConfirmation, branded C&F Bouw HTML)
//   - Queue with retry, audit logging, tenant isolation

import type { APIRoute }    from 'astro';
import { checkRateLimit }    from '../../lib/rateLimit';
import { getConvexClient, api } from '../../lib/convex';

export const prerender = false;

const API_URL = import.meta.env.PUBLIC_API_URL
    || "https://laventecareauthsystems.onrender.com/api/v1";
const TENANT_ID = import.meta.env.PUBLIC_TENANT_ID
    || "3b542934-6ac6-42b2-9511-a09e6cff8c80";

// Allowed origins for CSRF protection
const ALLOWED_ORIGINS = [
    'https://cfbouw.nl',
    'https://www.cfbouw.nl',
    'http://localhost:4321',
    'http://localhost:3000',
];

interface ContactPayload {
    naam:      string;
    email:     string;
    telefoon?: string;
    interesse?: string;
    bericht?:  string;
}

function validate(data: unknown): { valid: true; payload: ContactPayload } | { valid: false; error: string } {
    if (!data || typeof data !== 'object') {
        return { valid: false, error: 'Ongeldige aanvraag' };
    }
    const d = data as Record<string, unknown>;

    if (!d.naam || typeof d.naam !== 'string' || d.naam.trim().length < 2) {
        return { valid: false, error: 'Vul uw naam in (minimaal 2 tekens)' };
    }
    if (!d.email || typeof d.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
        return { valid: false, error: 'Vul een geldig e-mailadres in' };
    }

    return {
        valid: true,
        payload: {
            naam:      d.naam.trim(),
            email:     d.email.trim(),
            telefoon:  typeof d.telefoon  === 'string' ? d.telefoon.trim()  : undefined,
            interesse: typeof d.interesse === 'string' ? d.interesse.trim() : undefined,
            bericht:   typeof d.bericht   === 'string' ? d.bericht.trim()   : undefined,
        }
    };
}

/** Extract client IP — Vercel sends x-forwarded-for */
function getClientIP(request: Request): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown'
    );
}

/**
 * Compose a structured message body from all form fields.
 * The LaventeCare backend requires a minimum of 10 characters for the message field.
 */
function composeMessage(payload: ContactPayload): string {
    const parts: string[] = [];

    if (payload.telefoon) {
        parts.push(`Telefoon: ${payload.telefoon}`);
    }
    if (payload.interesse) {
        const labels: Record<string, string> = {
            offerte:  'Vrijblijvende offerte',
            advies:   'Adviesgesprek & inmeten',
            showroom: 'Showroom bezoeken',
            overig:   'Overige vraag',
        };
        parts.push(`Interesse: ${labels[payload.interesse] || payload.interesse}`);
    }
    if (payload.bericht) {
        parts.push(`\nBericht:\n${payload.bericht}`);
    }

    const message = parts.join('\n');

    // Backend requires minimum 10 chars. Pad with context if too short.
    if (message.length < 10) {
        return `Contactverzoek via cfbouw.nl formulier.${message ? '\n' + message : ''}`;
    }

    return message;
}

/**
 * Send contact form data to the LaventeCare AuthSystem backend.
 * The backend handles dual-email dispatch:
 *   1. Admin notification → info@cfbouw.nl (via TemplatePlainReply)
 *   2. User confirmation  → customer email (via TemplateContactConfirmation)
 */
async function sendViaLaventeCare(
    payload: ContactPayload,
    origin: string | null,
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/public/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Tenant-ID': TENANT_ID,
                ...(origin ? { 'Origin': origin } : {}),
            },
            body: JSON.stringify({
                name:    payload.naam,
                email:   payload.email,
                message: composeMessage(payload),
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('[LaventeCare] Backend error:', res.status, errorText);

            // Specific error for missing SMTP config (mail_config NULL)
            if (res.status === 500 && errorText.includes('tenant configuration incomplete')) {
                return { success: false, error: 'E-mailservice wordt momenteel geconfigureerd. Neem telefonisch contact op.' };
            }

            return { success: false, error: 'E-mail kon niet worden verstuurd' };
        }

        return { success: true };
    } catch (e) {
        console.error('[LaventeCare] Network error:', e);
        return { success: false, error: 'E-mailservice is tijdelijk onbereikbaar' };
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // ── 1. Origin Check (lightweight CSRF) ──────────────────
        const origin = request.headers.get('origin');
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            return json({ success: false, error: 'Ongeautoriseerd' }, 403);
        }

        // ── 2. Rate Limiting (5 per 15 min per IP) ──────────────
        const clientIP = getClientIP(request);
        const { limited, retryAfterMs } = checkRateLimit(clientIP);
        if (limited) {
            const retryAfterSec = Math.ceil((retryAfterMs || 60000) / 1000);
            return new Response(JSON.stringify({
                success: false,
                error: 'Te veel aanvragen. Probeer het later opnieuw.',
            }), {
                status: 429,
                headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfterSec) },
            });
        }

        const body = await request.json();

        // ── 3. Honeypot (bots fill the hidden website field) ────
        if (body.website) {
            // Silently accept but skip — never tip off bots
            return json({ success: true, message: 'Bedankt! Wij nemen zo snel mogelijk contact met u op.' }, 200);
        }

        // ── 4. Validation ────────────────────────────────────────
        const result = validate(body);
        if (!result.valid) {
            return json({ success: false, error: result.error }, 400);
        }

        const { payload } = result;

        // ── 5. Send via LaventeCare Backend (Dual-Email Dispatch) ─
        const emailResult = await sendViaLaventeCare(payload, origin);
        if (!emailResult.success) {
            return json({ success: false, error: emailResult.error || 'Er ging iets mis bij het versturen.' }, 502);
        }

        // ── 6. Persist to Convex (non-blocking for user) ────────
        try {
            const convex = getConvexClient();
            await convex.mutation(api.aanvragen.createAanvraag, {
                naam:      payload.naam,
                email:     payload.email,
                telefoon:  payload.telefoon,
                interesse: payload.interesse,
                bericht:   payload.bericht,
                ip:        clientIP,
            });
        } catch (convexErr) {
            // Log but don't fail the request — email is already queued
            console.warn('[Convex] Failed to persist aanvraag:', convexErr);
        }

        return json({ success: true, message: 'Bedankt! Wij nemen zo snel mogelijk contact met u op.' }, 200);

    } catch {
        return json({ success: false, error: 'Er ging iets mis. Probeer het later opnieuw.' }, 500);
    }
};

/** Helper: typed JSON response */
function json(body: object, status: number): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
