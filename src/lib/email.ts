// src/lib/email.ts
// Resend API integration for contact form submissions.
// Uses raw fetch — no extra npm dependency needed.

const RESEND_API = 'https://api.resend.com/emails';

interface ContactPayload {
    naam: string;
    email: string;
    telefoon?: string;
    interesse?: string;
    bericht?: string;
}

/** Escape HTML special characters to prevent XSS in email clients */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Build a professional HTML email from a contact form submission.
 */
function buildHtml(p: ContactPayload): string {
    const safeNaam = escapeHtml(p.naam);
    const safeEmail = escapeHtml(p.email);

    const rows = [
        ['Naam', safeNaam],
        ['E-mail', `<a href="mailto:${safeEmail}">${safeEmail}</a>`],
        p.telefoon ? ['Telefoon', `<a href="tel:${escapeHtml(p.telefoon)}">${escapeHtml(p.telefoon)}</a>`] : null,
        p.interesse ? ['Interesse', escapeHtml(p.interesse)] : null,
        p.bericht ? ['Bericht', escapeHtml(p.bericht).replace(/\n/g, '<br>')] : null,
    ].filter(Boolean) as [string, string][];

    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <div style="background: #155A84; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0; color: #fff; font-size: 20px;">Nieuw contactverzoek</h2>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.7); font-size: 14px;">Via cfbouw.nl contactformulier</p>
        </div>
        <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                ${rows.map(([label, value]) => `
                    <tr>
                        <td style="padding: 10px 12px; font-weight: 600; color: #334155; width: 110px; vertical-align: top;">${label}</td>
                        <td style="padding: 10px 12px; color: #0f172a;">${value}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            Dit bericht is automatisch verstuurd via het contactformulier op cfbouw.nl
        </p>
    </div>`;
}

/**
 * Send a contact form submission via Resend API.
 * Returns { success: true } or { success: false, error: string }.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<{ success: boolean; error?: string }> {
    const apiKey = import.meta.env.RESEND_API_KEY;
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'info@cfbouw.nl';

    if (!apiKey) {
        console.error('[Email] RESEND_API_KEY is not configured');
        return { success: false, error: 'E-mailservice is niet geconfigureerd' };
    }

    const interesseLabel = payload.interesse
        ? ` — ${payload.interesse}`
        : '';

    try {
        const res = await fetch(RESEND_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'C&F Bouw Website <noreply@cfbouw.nl>',
                to: [contactEmail],
                reply_to: payload.email,
                subject: `Nieuw contactverzoek van ${payload.naam}${interesseLabel}`,
                html: buildHtml(payload),
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('[Email] Resend API error:', res.status, err);
            return { success: false, error: 'E-mail kon niet worden verstuurd' };
        }

        return { success: true };
    } catch (e) {
        console.error('[Email] Network error:', e);
        return { success: false, error: 'E-mailservice is tijdelijk onbereikbaar' };
    }
}
