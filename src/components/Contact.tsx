import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Mail, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 960px)');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
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
            message,
            subject: `Nowa wiadomość od ${name} (${email}) z portfolio MKSITES`,
            from_name: "MKSITES Portfolio Form",
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
                setMessage('');
                setTimeout(() => {
                    navigate('/thank-you');
                }, 1500);
            } else {
                setSubmitStatus('error');
                console.error("Błąd Web3Forms:", result);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error("Wystąpił błąd podczas wysyłania:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactItems = [
        {
            icon: Phone,
            label: t('contact.phone'),
            value: "795 052 809",
            href: "tel:+48795052809",
            color: "var(--accent-red)",
            cta: "Zadzwoń teraz"
        },
        {
            icon: Mail,
            label: t('contact.email'),
            value: "kontakt@mksites.pl",
            href: "mailto:kontakt@mksites.pl",
            color: "var(--accent-blue)",
            cta: "Wyślij zapytanie"
        },
        {
            icon: Github,
            label: "GitHub",
            value: "Diabue",
            href: "https://github.com/Diabue",
            color: "#111111",
            cta: "Zobacz kod"
        }
    ];

    return (
        <section id="contact" style={{ 
            minHeight: '80vh',
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'var(--bg-color)',
            padding: '6rem 2rem'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <Reveal>
                        <h2 style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                            fontWeight: 900, 
                            letterSpacing: '-0.02em',
                            lineHeight: 1.0,
                            textTransform: 'uppercase',
                            marginBottom: '1rem' 
                        }}>
                            {t('contact.title')} <span style={{ color: 'var(--accent-red)' }}>{t('contact.titleAccent')}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
                            {t('contact.subtitle')}
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p style={{ marginTop: '1.5rem', fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                            {i18n.language === 'pl' ? 'Potrzebujesz dokładnej wyceny? ' : 'Need a precise quote? '}
                            <Link to="/inquiry" style={{ color: 'var(--accent-red)', textDecoration: 'underline' }}>
                                {i18n.language === 'pl' ? 'Wypełnij krótki brief projektowy' : 'Fill out a quick project brief'}
                            </Link>
                        </p>
                    </Reveal>
                </div>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '30px', 
                    maxWidth: '1200px', 
                    margin: '0 auto',
                    alignItems: 'stretch'
                }}>
                    {/* Left Column: Contact Cards */}
                    <div style={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px',
                        width: '100%' 
                    }}>
                        {contactItems.map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1} direction="up" width="100%">
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '2rem 1.5rem',
                                        textAlign: 'left',
                                        gap: '1rem',
                                        textDecoration: 'none',
                                        border: '1px solid var(--border-secondary)',
                                        borderRadius: '0px',
                                        backgroundColor: 'var(--bg-surface)',
                                        position: 'relative',
                                        transition: 'border-color 0.2s ease',
                                        height: '100%',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid var(--border-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-primary)',
                                        backgroundColor: '#FAFAFA'
                                    }}>
                                        <item.icon size={18} strokeWidth={2} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <h3 style={{ 
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '11px', 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '0.25rem', 
                                            fontWeight: 700, 
                                            textTransform: 'uppercase', 
                                            letterSpacing: '0.08em' 
                                        }}>
                                            {item.label}
                                        </h3>
                                        <p style={{ 
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.5rem', 
                                            color: 'var(--text-primary)', 
                                            fontWeight: 800, 
                                            textTransform: 'uppercase',
                                            marginBottom: '0.75rem',
                                            letterSpacing: '-0.02em',
                                            lineHeight: 1.1
                                        }}>
                                            {item.value}
                                        </p>
                                        <div style={{ 
                                            display: 'inline-flex', 
                                            alignItems: 'center', 
                                            gap: '4px', 
                                            color: '#FFFFFF', 
                                            backgroundColor: '#111111',
                                            borderRadius: '30px',
                                            padding: '6px 14px',
                                            fontSize: '12px', 
                                            fontWeight: 500,
                                            fontFamily: 'var(--font-body)'
                                        }}>
                                            {item.cta} <ExternalLink size={12} />
                                        </div>
                                    </div>
                                </a>
                            </Reveal>
                        ))}
                    </div>

                    {/* Right Column: Contact Form */}
                    <div style={{ flex: 1.2, display: 'flex', width: '100%' }}>
                        <Reveal delay={0.15} direction="up" width="100%">
                            <form onSubmit={handleSubmit} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                backgroundColor: 'var(--bg-surface)',
                                border: '1px solid var(--border-secondary)',
                                padding: '2.5rem 2rem',
                                width: '100%',
                                height: '100%',
                                boxSizing: 'border-box'
                            }}>
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
                                        marginBottom: '10px'
                                    }}>
                                        {t('contact.success')}
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
                                        marginBottom: '10px'
                                    }}>
                                        {t('contact.error')}
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                    <label htmlFor="name" style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>{t('contact.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder={t('contact.name')}
                                        style={{
                                            backgroundColor: '#F5F5F5',
                                            border: '1px solid var(--border-secondary)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-body)',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-secondary)'}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                    <label htmlFor="email" style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>{t('contact.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder={t('contact.email')}
                                        style={{
                                            backgroundColor: '#F5F5F5',
                                            border: '1px solid var(--border-secondary)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-body)',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-secondary)'}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                    <label htmlFor="message" style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>{t('contact.message')}</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        placeholder={t('contact.message')}
                                        style={{
                                            backgroundColor: '#F5F5F5',
                                            border: '1px solid var(--border-secondary)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-body)',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            resize: 'none',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-secondary)'}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: isSubmitting ? 'var(--text-disabled)' : 'var(--bg-dark-section)',
                                        color: '#FFFFFF',
                                        padding: '12px 24px',
                                        border: 'none',
                                        borderRadius: '30px',
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        marginTop: 'auto',
                                        transition: 'background-color 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--text-secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--bg-dark-section)';
                                    }}
                                >
                                    {isSubmitting ? (i18n.language === 'pl' ? 'Wysyłanie...' : 'Sending...') : t('contact.send')}
                                </button>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
