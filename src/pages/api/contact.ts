// src/pages/api/contact.ts
// Server endpoint for contact form submissions

import type { APIRoute } from 'astro';

export const prerender = false;

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

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const result = validate(body);

        if (!result.valid) {
            return new Response(JSON.stringify({ success: false, error: result.error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { payload } = result;

        // TODO: Integrate with email service (Resend, SendGrid, Mailgun, etc.)
        // For now, log and return success
        console.log('[Contact Form]', JSON.stringify(payload, null, 2));

        return new Response(JSON.stringify({ success: true, message: 'Bedankt! Wij nemen zo snel mogelijk contact met u op.' }), {
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
