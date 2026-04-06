import { ArrowRight, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Hero = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <Reveal>
                        <h1 style={{
                            fontSize: 'clamp(2.25rem, 8vw, 5.5rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            lineHeight: 1.05,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            {t('hero.headlineFirst')} <br />
                            <span style={{ 
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block',
                                paddingBottom: '0.1em'
                            }}>
                                {t('hero.headlineAccent')}
                            </span> <br />
                            {t('hero.headlineLast')}
                        </h1>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            maxWidth: '750px',
                            margin: '0 auto 3rem',
                            fontWeight: 500
                        }}>
                            {t('hero.subheadline')}
                        </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '1.5rem' 
                        }}>
                            <motion.button
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(167, 139, 250, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: 'var(--accent-color)',
                                    color: 'white',
                                    padding: isMobile ? '1.25rem 2rem' : '1.5rem 3.5rem',
                                    borderRadius: '3rem',
                                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                                    fontWeight: 900,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    width: isMobile ? '100%' : 'auto',
                                    justifyContent: 'center'
                                }}
                            >
                                {t('hero.cta')} <ArrowRight size={isMobile ? 20 : 24} />
                            </motion.button>

                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1rem', 
                                color: 'white', 
                                fontWeight: 700,
                                fontSize: isMobile ? '0.9rem' : '1.1rem'
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <Phone size={isMobile ? 16 : 20} color="var(--accent-color)" />
                                    <span>{t('hero.trust')}</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Glowing background highlights */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />
        </section>
    );
};

export default Hero;
