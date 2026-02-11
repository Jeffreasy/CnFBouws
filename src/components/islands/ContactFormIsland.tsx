/**
 * ContactFormIsland — Interactive React island for the contact form
 * Renders client-side with validation, loading states, and API submission.
 * Used with `client:visible` to lazy-load when scrolled into view.
 */
import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    naam: string;
    email: string;
    telefoon: string;
    interesse: string;
    bericht: string;
}

const INITIAL_DATA: FormData = {
    naam: '',
    email: '',
    telefoon: '',
    interesse: '',
    bericht: '',
};

export default function ContactFormIsland() {
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

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
        const error = validateField(name, data[name]);
        if (error) setErrors(prev => ({ ...prev, [name]: error }));
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

    if (status === 'success') {
        return (
            <div className="form-success" role="alert">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-cta)', marginBottom: '1rem' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>Bericht verzonden!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{message}</p>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStatus('idle')}
                >
                    Nog een bericht versturen
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
                <label htmlFor="naam" className="form-label">Naam *</label>
                <input
                    type="text"
                    id="naam"
                    value={data.naam}
                    onChange={e => handleChange('naam', e.target.value)}
                    onBlur={() => handleBlur('naam')}
                    className={`form-input ${errors.naam ? 'form-input--error' : ''}`}
                    placeholder="Uw volledige naam"
                    required
                    autoComplete="name"
                />
                {errors.naam && <span className="form-error">{errors.naam}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">E-mail *</label>
                <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="uw@email.nl"
                    required
                    autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="telefoon" className="form-label">Telefoon</label>
                <input
                    type="tel"
                    id="telefoon"
                    value={data.telefoon}
                    onChange={e => handleChange('telefoon', e.target.value)}
                    className="form-input"
                    placeholder="06 1234 5678"
                    autoComplete="tel"
                />
            </div>

            <div className="form-group">
                <label htmlFor="interesse" className="form-label">Interesse</label>
                <select
                    id="interesse"
                    value={data.interesse}
                    onChange={e => handleChange('interesse', e.target.value)}
                    className="form-input"
                >
                    <option value="">Kies een onderwerp</option>
                    <option value="offerte">Vrijblijvende offerte</option>
                    <option value="advies">Adviesgesprek &amp; inmeten</option>
                    <option value="showroom">Showroom bezoeken</option>
                    <option value="overig">Overige vraag</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="bericht" className="form-label">Bericht</label>
                <textarea
                    id="bericht"
                    value={data.bericht}
                    onChange={e => handleChange('bericht', e.target.value)}
                    className="form-input form-textarea"
                    placeholder="Vertel ons meer over uw wensen..."
                    rows={4}
                />
            </div>

            {status === 'error' && (
                <div className="form-alert form-alert--error" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {message}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary btn-lg form-submit"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? (
                    <>
                        <span className="spinner" aria-hidden="true" />
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
