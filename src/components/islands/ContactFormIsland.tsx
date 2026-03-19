/**
 * ContactFormIsland — Interactive React island for the contact form
 * All styling is inline to guarantee it renders correctly regardless of
 * Astro CSS scoping. Matches the dark glass design system.
 */
import { useState, useEffect, type FormEvent, type CSSProperties } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    naam: string;
    email: string;
    telefoon: string;
    interesse: string;
    bericht: string;
    website: string; // Honeypot — hidden from users, bots fill it
}

const INITIAL_DATA: FormData = {
    naam: '',
    email: '',
    telefoon: '',
    interesse: '',
    bericht: '',
    website: '',
};

/* ═══════════════════════════════════════════════════════════
   INLINE STYLES — Design token equivalents
   ═══════════════════════════════════════════════════════════ */
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    } as CSSProperties,

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    } as CSSProperties,

    label: {
        fontFamily: "var(--font-heading)",
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: 'var(--text-secondary, rgba(255,255,255,0.7))',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    } as CSSProperties,

    input: {
        padding: '0.875rem 1rem',
        background: 'var(--surface-card, #FEFDFB)',
        border: '1px solid var(--border-card, #DDD8D0)',
        borderRadius: '0.625rem',
        fontFamily: "var(--font-body)",
        fontSize: '1rem',
        color: 'var(--text-primary, #0F172A)',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        WebkitAppearance: 'none',
        appearance: 'none',
    } as CSSProperties,

    inputFocus: {
        borderColor: 'var(--color-cta, #e8722a)',
        boxShadow: '0 0 0 3px rgba(232, 114, 42, 0.15)',
    } as CSSProperties,

    inputError: {
        borderColor: 'var(--color-error, #ef4444)',
    } as CSSProperties,

    select: {
        padding: '0.875rem 1rem',
        background: 'var(--surface-card, #FEFDFB)',
        border: '1px solid var(--border-card, #DDD8D0)',
        borderRadius: '0.625rem',
        fontFamily: "var(--font-body)",
        fontSize: '1rem',
        color: 'var(--text-primary, #0F172A)',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        WebkitAppearance: 'none',
        appearance: 'none',
        // Neutral dark chevron — visible in both light + dark mode via currentColor
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '16px',
        paddingRight: '2.5rem',
    } as CSSProperties,

    textarea: {
        resize: 'vertical' as const,
        minHeight: '120px',
    },

    errorText: {
        fontSize: '0.8125rem',
        color: 'var(--color-error, #ef4444)',
        fontWeight: 500,
    } as CSSProperties,

    submitBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '1rem 1.5rem',
        background: 'var(--color-cta, #e8722a)',
        color: '#fff',
        border: 'none',
        borderRadius: '0.625rem',
        fontFamily: "var(--font-heading)",
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',
        marginTop: '0.5rem',
    } as CSSProperties,

    submitBtnDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    } as CSSProperties,

    alert: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.875rem 1rem',
        borderRadius: '0.625rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        background: 'rgba(239, 68, 68, 0.08)',
        color: 'var(--color-error, #ef4444)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
    } as CSSProperties,

    successWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
    } as CSSProperties,

    successIcon: {
        color: 'var(--color-cta, #e8722a)',
        marginBottom: '1.25rem',
    } as CSSProperties,

    successTitle: {
        fontFamily: "var(--font-heading)",
        fontSize: '1.375rem',
        fontWeight: 700,
        color: 'var(--text-heading, #0F172A)',
        marginBottom: '0.5rem',
    } as CSSProperties,

    successText: {
        color: 'var(--text-secondary, #5A595A)',
        marginBottom: '1.5rem',
        lineHeight: 1.6,
    } as CSSProperties,

    resetBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'transparent',
        color: 'var(--text-primary, #0F172A)',
        border: '1px solid var(--border-card, #DDD8D0)',
        borderRadius: '0.625rem',
        fontFamily: "var(--font-heading)",
        fontSize: '0.9375rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
    } as CSSProperties,

    spinner: {
        display: 'inline-block',
        width: '18px',
        height: '18px',
        border: '2px solid rgba(255,255,255,0.3)', /* spinner is always on CTA orange = always white OK */
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'contactSpin 0.6s linear infinite',
    } as CSSProperties,
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function ContactFormIsland() {
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [focused, setFocused] = useState<string | null>(null);

    // Reset all form state when the contact modal closes
    useEffect(() => {
        function handleModalClosed() {
            setData(INITIAL_DATA);
            setStatus('idle');
            setErrors({});
            setMessage('');
            setFocused(null);
        }
        document.addEventListener('modal:closed', handleModalClosed);
        return () => document.removeEventListener('modal:closed', handleModalClosed);
    }, []);

    function validateField(name: keyof FormData, value: string): string {
        if (name === 'naam' && value.trim().length < 2) return 'Vul uw naam in';
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Vul een geldig e-mailadres in';
        return '';
    }

    function handleChange(name: keyof FormData, value: string) {
        setData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) || undefined }));
        }
    }

    function handleBlur(name: keyof FormData) {
        setFocused(null);
        const error = validateField(name, data[name]);
        if (error) setErrors(prev => ({ ...prev, [name]: error }));
    }

    function handleFocus(name: string) {
        setFocused(name);
    }

    function getInputStyle(name: keyof FormData): CSSProperties {
        return {
            ...styles.input,
            ...(focused === name ? styles.inputFocus : {}),
            ...(errors[name] ? styles.inputError : {}),
        };
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const newErrors: Partial<Record<keyof FormData, string>> = {};
        const naamErr = validateField('naam', data.naam);
        const emailErr = validateField('email', data.email);
        if (naamErr) newErrors.naam = naamErr;
        if (emailErr) newErrors.email = emailErr;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStatus('loading');
        setErrors({});

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setStatus('success');
                setMessage(result.message || 'Bedankt! Wij nemen zo snel mogelijk contact met u op.');
                setData(INITIAL_DATA);
            } else {
                setStatus('error');
                setMessage(result.error || 'Er ging iets mis.');
            }
        } catch {
            setStatus('error');
            setMessage('Verbinding mislukt. Controleer uw internetverbinding.');
        }
    }

    /* ─── Keyframe injection (once) ──────────────────────────── */
    if (typeof document !== 'undefined' && !document.getElementById('contact-spin-kf')) {
        const sheet = document.createElement('style');
        sheet.id = 'contact-spin-kf';
        sheet.textContent = `@keyframes contactSpin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(sheet);
    }

    /* ─── Success state ──────────────────────────────────────── */
    if (status === 'success') {
        return (
            <div style={styles.successWrap} role="alert">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.successIcon}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 style={styles.successTitle}>Bericht verzonden!</h3>
                <p style={styles.successText}>{message}</p>
                <button
                    type="button"
                    style={styles.resetBtn}
                    onClick={() => setStatus('idle')}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                >
                    Nog een bericht versturen
                </button>
            </div>
        );
    }

    /* ─── Form ───────────────────────────────────────────────── */
    return (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
            {/* Naam */}
            <div style={styles.formGroup}>
                <label htmlFor="naam" style={styles.label}>Naam *</label>
                <input
                    type="text"
                    id="naam"
                    value={data.naam}
                    onChange={e => handleChange('naam', e.target.value)}
                    onBlur={() => handleBlur('naam')}
                    onFocus={() => handleFocus('naam')}
                    style={getInputStyle('naam')}
                    placeholder="Uw volledige naam"
                    required
                    autoComplete="name"
                    aria-invalid={!!errors.naam}
                    aria-describedby={errors.naam ? "naam-error" : undefined}
                />
                {errors.naam && <span id="naam-error" style={styles.errorText}>{errors.naam}</span>}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>E-mail *</label>
                <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    onFocus={() => handleFocus('email')}
                    style={getInputStyle('email')}
                    placeholder="uw@email.nl"
                    required
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Telefoon */}
            <div style={styles.formGroup}>
                <label htmlFor="telefoon" style={styles.label}>Telefoon</label>
                <input
                    type="tel"
                    id="telefoon"
                    value={data.telefoon}
                    onChange={e => handleChange('telefoon', e.target.value)}
                    onFocus={() => handleFocus('telefoon')}
                    onBlur={() => setFocused(null)}
                    style={{
                        ...styles.input,
                        ...(focused === 'telefoon' ? styles.inputFocus : {}),
                    }}
                    placeholder="06 1234 5678"
                    autoComplete="tel"
                />
            </div>

            {/* Interesse */}
            <div style={styles.formGroup}>
                <label htmlFor="interesse" style={styles.label}>Interesse</label>
                <select
                    id="interesse"
                    value={data.interesse}
                    onChange={e => handleChange('interesse', e.target.value)}
                    onFocus={() => handleFocus('interesse')}
                    onBlur={() => setFocused(null)}
                    style={{
                        ...styles.select,
                        ...(focused === 'interesse' ? styles.inputFocus : {}),
                    }}
                >
                    <option value="">Kies een onderwerp</option>
                    <option value="offerte">Vrijblijvende offerte</option>
                    <option value="advies">Adviesgesprek &amp; inmeten</option>
                    <option value="showroom">Showroom bezoeken</option>
                    <option value="overig">Overige vraag</option>
                </select>
            </div>

            {/* Bericht */}
            <div style={styles.formGroup}>
                <label htmlFor="bericht" style={styles.label}>Bericht</label>
                <textarea
                    id="bericht"
                    value={data.bericht}
                    onChange={e => handleChange('bericht', e.target.value)}
                    onFocus={() => handleFocus('bericht')}
                    onBlur={() => setFocused(null)}
                    style={{
                        ...styles.input,
                        ...styles.textarea,
                        ...(focused === 'bericht' ? styles.inputFocus : {}),
                    }}
                    placeholder="Vertel ons meer over uw wensen..."
                    rows={4}
                />
            </div>

            {/* Honeypot — visually hidden, bots auto-fill */}
            <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    value={data.website}
                    onChange={e => handleChange('website', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {/* Error Alert */}
            {status === 'error' && (
                <div style={styles.alert} role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {message}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                style={{
                    ...styles.submitBtn,
                    ...(status === 'loading' ? styles.submitBtnDisabled : {}),
                }}
                disabled={status === 'loading'}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.boxShadow = '0 0 24px rgba(232, 114, 42, 0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
                {status === 'loading' ? (
                    <>
                        <span style={styles.spinner} aria-hidden="true" />
                        Versturen...
                    </>
                ) : (
                    <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Verstuur bericht
                    </>
                )}
            </button>
        </form>
    );
}
