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
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
            position: 'relative',
            backgroundColor: 'var(--bg-surface)',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <Reveal>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            lineHeight: 0.90,
                            textTransform: 'uppercase',
                            marginBottom: '2rem',
                            color: 'var(--text-primary)'
                        }}>
                            {t('hero.headlineFirst')} <br />
                            <span style={{ 
                                color: 'var(--accent-red)',
                                display: 'inline-block',
                            }}>
                                {t('hero.headlineAccent')}
                            </span> <br />
                            {t('hero.headlineLast')}
                        </h1>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            maxWidth: '750px',
                            margin: '0 auto 3rem',
                            fontWeight: 400
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
                            gap: '2rem' 
                        }}>
                            <motion.button
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    backgroundColor: 'var(--bg-dark-section)',
                                    color: '#FFFFFF',
                                    padding: isMobile ? '1rem 2.25rem' : '1.15rem 3rem',
                                    borderRadius: '30px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    width: isMobile ? '100%' : 'auto',
                                    justifyContent: 'center',
                                    transition: 'background-color 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--text-secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-dark-section)'}
                            >
                                {t('hero.cta')} <ArrowRight size={18} />
                            </motion.button>

                            <div style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isMobile ? 'center' : 'flex-start',
                                gap: '0.25rem',
                                borderLeft: isMobile ? 'none' : '2px solid var(--border-secondary)',
                                paddingLeft: isMobile ? '0' : '1.5rem',
                                textAlign: 'left',
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    color: 'var(--text-secondary)',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    <Phone size={16} color="var(--text-secondary)" />
                                    <span>{t('hero.trust')}</span>
                                </div>
                                <p style={{ 
                                    fontSize: '16px', 
                                    color: 'var(--text-primary)', 
                                    fontWeight: 600,
                                    margin: 0
                                }}>
                                    {t('hero.priceLine')}
                                </p>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: 'var(--text-secondary)',
                                    margin: 0,
                                    fontWeight: 400
                                }}>
                                    {t('hero.advancedLine')}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
