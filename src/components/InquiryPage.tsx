import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send } from 'lucide-react';
import { Reveal } from './Reveal';

const InquiryPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [projectType, setProjectType] = useState('website');
    const [budget, setBudget] = useState('1500-3000');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
        
        if (!accessKey) {
            console.error("Brak klucza VITE_WEB3FORMS_ACCESS_KEY w pliku .env");
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        const formData = {
            access_key: accessKey,
            name,
            email,
            phone,
            project_type: projectType,
            budget,
            description,
            subject: `📋 NOWE ZAPYTANIE OFERTOWE od ${name} (${email}) - MKSITES`,
            from_name: "MKSITES Inquiry Planner",
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                setSubmitStatus('success');
                setName('');
                setEmail('');
                setPhone('');
                setDescription('');
                setTimeout(() => {
                    navigate('/inquiry-received');
                }, 1500);
            } else {
                setSubmitStatus('error');
                console.error("Błąd Web3Forms:", result);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error("Wystąpił błąd podczas wysyłania zapytania:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-color)',
            padding: '4rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                {/* Back Link */}
                <Link to="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                }}>
                    <ArrowLeft size={16} />
                    {t('inquiry.back', 'Powrót do strony głównej')}
                </Link>

                <div style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-secondary)',
                    padding: '3rem 2.5rem',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Reveal>
                            <h1 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.0,
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                            }}>
                                {t('inquiry.title', 'Dopasuj projekt')} <span style={{ color: 'var(--accent-red)' }}>{t('inquiry.titleAccent', 'do swojej firmy')}</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: 1.5,
                            }}>
                                {t('inquiry.subtitle', 'Wypełnij poniższe szczegóły. Pomoże mi to stworzyć idealną wycenę dopasowaną do Twoich celów biznesowych.')}
                            </p>
                        </Reveal>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {submitStatus === 'success' && (
                            <div style={{
                                backgroundColor: '#10B981',
                                color: '#FFFFFF',
                                padding: '12px 16px',
                                fontSize: '14px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: 'var(--font-body)',
                                textAlign: 'center',
                            }}>
                                {t('inquiry.success', 'Zapytanie zostało wysłane pomyślnie!')}
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div style={{
                                backgroundColor: 'var(--accent-red)',
                                color: '#FFFFFF',
                                padding: '12px 16px',
                                fontSize: '14px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: 'var(--font-body)',
                                textAlign: 'center',
                            }}>
                                {t('inquiry.error', 'Wystąpił błąd. Spróbuj ponownie lub napisz na kontakt@mksites.pl.')}
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                    {t('inquiry.name', 'Imię i Nazwisko / Firma')}
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                    {t('inquiry.email', 'Adres E-mail')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                    {t('inquiry.phone', 'Numer Telefonu')}
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                    {t('inquiry.project_type', 'Rodzaj Projektu')}
                                </label>
                                <select
                                    value={projectType}
                                    onChange={(e) => setProjectType(e.target.value)}
                                    style={selectStyle}
                                >
                                    <option value="website">{t('inquiry.opt_website')}</option>
                                    <option value="landing">{t('inquiry.opt_landing')}</option>
                                    <option value="store">{t('inquiry.opt_store')}</option>
                                    <option value="booking">{t('inquiry.opt_booking')}</option>
                                    <option value="other">{t('inquiry.opt_other')}</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                {t('inquiry.budget', 'Zakładany Budżet')}
                            </label>
                            <select
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="under-1500">{t('inquiry.budget_under')}</option>
                                <option value="1500-3000">{t('inquiry.budget_mid')}</option>
                                <option value="over-3000">{t('inquiry.budget_over')}</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                {t('inquiry.desc_label', 'Opis projektu i Twoich celów')}
                            </label>
                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder={t('inquiry.placeholder', 'Opisz w kilku słowach czym zajmuje się Twoja firma i jaki jest cel nowej strony (np. pozyskiwanie klientów, automatyczna rezerwacja usług)...')}
                                style={textareaStyle}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: isSubmitting ? 'var(--text-disabled)' : 'var(--bg-dark-section)',
                                color: '#FFFFFF',
                                padding: '16px 24px',
                                border: 'none',
                                borderRadius: '30px',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'background-color 0.2s ease',
                                marginTop: '1rem',
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--text-secondary)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--bg-dark-section)';
                            }}
                        >
                            {isSubmitting ? (i18n.language === 'pl' ? 'Wysyłanie...' : 'Sending...') : t('inquiry.submit', 'Wyślij brief i odbierz wycenę')}
                            {!isSubmitting && <Send size={18} />}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const inputStyle: React.CSSProperties = {
    backgroundColor: '#F5F5F5',
    border: '1px solid var(--border-secondary)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    outline: 'none',
};

const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23707072' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '16px',
    paddingRight: '40px',
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'none',
};

export default InquiryPage;
