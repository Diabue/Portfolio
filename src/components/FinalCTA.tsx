import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const FinalCTA = () => {
    const { t } = useTranslation();

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="cta_final" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2.5rem'
                }}>
                    <Reveal>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backgroundColor: 'rgba(167, 139, 250, 0.1)',
                            color: 'var(--accent-color)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                            <Sparkles size={16} /> {t('cta_final.title')}
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1,
                            color: 'var(--text-primary)'
                        }}>
                            {t('cta_final.title')} <br />
                            <span style={{ 
                                background: 'linear-gradient(to right, var(--accent-color), #3b82f6)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent' 
                            }}>
                                {t('cta_final.titleAccent')}
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            {t('cta_final.text')}
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <motion.button
                            onClick={scrollToContact}
                            whileHover={{ scale: 1.05, boxShadow: 'var(--accent-glow)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                padding: '1.25rem 3rem',
                                borderRadius: '3rem',
                                fontSize: '1.2rem',
                                fontWeight: 800,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}
                        >
                            {t('cta_final.button')} <ArrowRight size={22} />
                        </motion.button>
                    </Reveal>
                </div>
            </div>

            {/* Abstract backgrounds */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />
        </section>
    );
};

export default FinalCTA;
