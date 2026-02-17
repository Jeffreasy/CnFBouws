// src/pages/api/contact.ts
// Server endpoint for contact form submissions
// Features: validation, rate limiting, honeypot, origin check, email delivery

import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/email';
import { checkRateLimit } from '../../lib/rateLimit';

export const prerender = false;

// Allowed origins for CSRF protection
const ALLOWED_ORIGINS = [
    'https://cfbouw.nl',
    'https://www.cfbouw.nl',
    'http://localhost:4321',
    'http://localhost:3000',
];

interface ContactPayload {
    naam: string;
    email: string;
    telefoon?: string;
    interesse?: string;
    bericht?: string;
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
            naam: d.naam.trim(),
            email: d.email.trim(),
            telefoon: typeof d.telefoon === 'string' ? d.telefoon.trim() : undefined,
            interesse: typeof d.interesse === 'string' ? d.interesse.trim() : undefined,
            bericht: typeof d.bericht === 'string' ? d.bericht.trim() : undefined,
        }
    };
}

/**
 * Extract client IP from request headers (Vercel sends x-forwarded-for).
 */
function getClientIP(request: Request): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // ── Origin Check (lightweight CSRF) ────────────────────
        const origin = request.headers.get('origin');
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            return new Response(JSON.stringify({ success: false, error: 'Ongeautoriseerd' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ── Rate Limiting (5 per 15 min per IP) ────────────────
        const clientIP = getClientIP(request);
        const { limited, retryAfterMs } = checkRateLimit(clientIP);

        if (limited) {
            const retryAfterSec = Math.ceil((retryAfterMs || 60000) / 1000);
            return new Response(JSON.stringify({
                success: false,
                error: 'Te veel aanvragen. Probeer het later opnieuw.',
            }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': String(retryAfterSec),
                },
            });
        }

        const body = await request.json();

        // ── Honeypot Check (bots fill hidden fields) ───────────
        if (body.website) {
            // Silently accept but don't process — don't tip off bots
            return new Response(JSON.stringify({
                success: true,
                message: 'Bedankt! Wij nemen zo snel mogelijk contact met u op.',
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ── Validation ─────────────────────────────────────────
        const result = validate(body);
        if (!result.valid) {
            return new Response(JSON.stringify({ success: false, error: result.error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ── Send Email ─────────────────────────────────────────
        const { payload } = result;
        const emailResult = await sendContactEmail(payload);

        if (!emailResult.success) {
            return new Response(JSON.stringify({
                success: false,
                error: emailResult.error || 'Er ging iets mis bij het versturen.',
            }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Bedankt! Wij nemen zo snel mogelijk contact met u op.',
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ success: false, error: 'Er ging iets mis. Probeer het later opnieuw.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
