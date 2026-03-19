// src/pages/api/contact.ts
// Server endpoint for contact form submissions.
// Pipeline: validate → rate-limit → honeypot → send email → persist to Convex

import type { APIRoute }    from 'astro';
import { sendContactEmail }  from '../../lib/email';
import { checkRateLimit }    from '../../lib/rateLimit';
import { getConvexClient, api } from '../../lib/convex';

export const prerender = false;

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

        // ── 5. Send Email ────────────────────────────────────────
        const emailResult = await sendContactEmail(payload);
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
            // Log but don't fail the request — email is already sent
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
