import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
    const { t } = useTranslation();

    // Wywołanie zdarzenia w Google Analytics/Google Ads dla aplikacji Single Page (SPA)
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_view', {
                page_path: '/thank-you',
                page_title: 'Dziękujemy za kontakt | MKSites',
            });
        }
    }, []);

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-color)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-secondary)',
                padding: '4rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
            }}>
                {/* Checkmark Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        marginBottom: '1rem',
                    }}
                >
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                </motion.div>

                <div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.0,
                        textTransform: 'uppercase',
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                    }}>
                        {t('thankyou.title', 'DZIĘKUJEMY ZA KONTAKT!')}
                    </h1>
                    <p style={{
                        fontSize: '1.15rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-body)',
                        margin: 0,
                    }}>
                        {t('thankyou.subtitle', 'Otrzymaliśmy Twoją wiadomość. Odpowiemy na nią w ciągu najbliższych kilku godzin.')}
                    </p>
                </div>

                <Link
                    to="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'var(--bg-dark-section)',
                        color: '#FFFFFF',
                        padding: '12px 28px',
                        borderRadius: '30px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'background-color 0.2s ease',
                        textDecoration: 'none',
                        marginTop: '1rem',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--text-secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-dark-section)'}
                >
                    <ArrowLeft size={16} />
                    {t('thankyou.button', 'Wróć do strony głównej')}
                </Link>
            </div>
        </section>
    );
};

export default ThankYouPage;
