import { Phone, Mail, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const Contact = () => {
    const { t } = useTranslation();

    const contactItems = [
        {
            icon: Phone,
            label: t('contact.phone'),
            value: "795 052 809",
            href: "tel:+48795052809",
            color: "#10b981",
            cta: "Zadzwoń teraz"
        },
        {
            icon: Mail,
            label: t('contact.email'),
            value: "maks@mksites.pl",
            href: "mailto:maks@mksites.pl",
            color: "#3b82f6",
            cta: "Wyślij zapytanie"
        },
        {
            icon: Github,
            label: "GitHub",
            value: "Diabue",
            href: "https://github.com/Diabue",
            color: "#ffffff",
            cta: "Zobacz kod"
        }
    ];

    return (
        <section id="contact" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <Reveal>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.04em' }}>
                            {t('contact.title')} <span style={{
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>{t('contact.titleAccent')}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
                            {t('contact.subtitle')}
                        </p>
                    </Reveal>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '2rem', 
                    maxWidth: '1200px', 
                    margin: '0 auto' 
                }}>
                    {contactItems.map((item, idx) => (
                        <Reveal key={idx} delay={idx * 0.15} direction={idx === 0 ? 'left' : idx === 1 ? 'up' : 'right'}>
                            <motion.a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-panel"
                                whileHover={{ scale: 1.02, y: -8 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '3rem 2.5rem',
                                    textAlign: 'left',
                                    gap: '1.5rem',
                                    textDecoration: 'none',
                                    border: `1px solid ${item.color}33`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '1.25rem',
                                    background: `${item.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: item.color,
                                    boxShadow: `0 0 20px ${item.color}11`
                                }}>
                                    <item.icon size={32} strokeWidth={2.5} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <h3 style={{ 
                                        fontSize: '0.85rem', 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: '0.5rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.15em' 
                                    }}>
                                        {item.label}
                                    </h3>
                                    <p style={{ 
                                        fontSize: 'min(1.5rem, 5vw)', 
                                        color: '#fff', 
                                        fontWeight: 800, 
                                        marginBottom: '1rem',
                                        letterSpacing: '-0.02em'
                                    }}>
                                        {item.value}
                                    </p>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        color: item.color, 
                                        fontSize: '0.9rem', 
                                        fontWeight: 700,
                                        opacity: 0.8
                                    }}>
                                        {item.cta} <ExternalLink size={14} />
                                    </div>
                                </div>

                                {/* Radial accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-40%',
                                    right: '-40%',
                                    width: '200px',
                                    height: '200px',
                                    background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                                    pointerEvents: 'none'
                                }} />
                            </motion.a>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.5}>
                    <div style={{ 
                        marginTop: '5rem', 
                        textAlign: 'center', 
                        padding: '2rem', 
                        borderRadius: '2rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        maxWidth: '500px',
                        margin: '5rem auto 0'
                    }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>
                            🚀 <span style={{ color: '#fff' }}>Gwarancja kontaktu:</span> zazwyczaj odpowiadam <span style={{ color: '#a78bfa' }}>w ciągu kilku godzin</span>.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
