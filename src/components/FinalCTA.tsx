import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const FinalCTA = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

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
            justifyContent: 'center',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: isMobile ? '2rem' : '3rem'
                }}>
                    <Reveal>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backgroundColor: 'rgba(167, 139, 250, 0.1)',
                            color: '#a78bfa',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase'
                        }}>
                            <Sparkles size={isMobile ? 16 : 18} /> {t('projects.titleAccent')}
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(2.25rem, 6.5vw, 5rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            lineHeight: 1.05,
                            color: 'var(--text-primary)',
                            padding: '0 1rem'
                        }}>
                            {t('cta_final.title')} <br />
                            <span style={{ 
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block',
                                paddingBottom: '0.1em'
                            }}>
                                {t('cta_final.titleAccent')}
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.45,
                            maxWidth: '750px',
                            margin: '0 auto',
                            fontWeight: 500
                        }}>
                            {t('cta_final.text')}
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <motion.button
                            onClick={scrollToContact}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(167, 139, 250, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                backgroundColor: '#a78bfa',
                                color: 'white',
                                padding: isMobile ? '1.25rem 2.5rem' : '1.5rem 3.5rem',
                                borderRadius: '4rem',
                                fontSize: isMobile ? '1.1rem' : '1.3rem',
                                fontWeight: 900,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                boxShadow: '0 15px 30px -10px rgba(167, 139, 250, 0.4)',
                                width: isMobile ? '100%' : 'auto',
                                justifyContent: 'center'
                            }}
                        >
                            {t('cta_final.button')} <ArrowRight size={isMobile ? 22 : 26} strokeWidth={3} />
                        </motion.button>
                    </Reveal>
                </div>
            </div>

            {/* Background glowing effects */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '500px' : '800px',
                height: isMobile ? '500px' : '800px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default FinalCTA;
