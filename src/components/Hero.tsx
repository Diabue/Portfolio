import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import mksLogo from '../assets/logo.svg';
import { Reveal } from './Reveal';

const Hero = () => {
    const { t } = useTranslation();
    const prefersReducedMotion = useReducedMotion();

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" style={{
            height: '100vh',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 0,
            scrollSnapAlign: 'start'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2rem'
                }}>
                    {/* MKS Logo */}
                    <Reveal>
                        <motion.div 
                            animate={prefersReducedMotion ? {} : { y: [0, -5, 0], opacity: [0.9, 1, 0.9] }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut" }}
                            style={{
                                width: '120px',
                                height: 'auto',
                                marginBottom: '1rem'
                            }}
                        >
                            <img
                                src={mksLogo}
                                alt="MKS Web Dev"
                                style={{
                                    width: '100%',
                                    filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.4))'
                                }}
                            />
                        </motion.div>
                    </Reveal>

                    <div style={{ maxWidth: '900px' }}>
                        <Reveal>
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                                marginBottom: '1.5rem',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                                color: 'var(--text-primary)'
                            }}>
                                {t('hero.headlineFirst')}{' '}
                                <span style={{
                                    background: 'linear-gradient(to right, var(--accent-color), #3b82f6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block'
                                }}>
                                    {t('hero.headlineAccent')}
                                </span><br />
                                {t('hero.headlineLast')}
                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                                color: 'var(--text-secondary)',
                                maxWidth: '750px',
                                margin: '0 auto',
                                fontWeight: 400,
                                lineHeight: 1.5,
                                letterSpacing: '0.01em'
                            }}>
                                {t('hero.subheadline')}
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.4}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            <motion.button
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.05, boxShadow: 'var(--accent-glow)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: 'var(--accent-color)',
                                    color: 'white',
                                    padding: '1.2rem 2.5rem',
                                    borderRadius: '3rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {t('hero.cta')}
                            </motion.button>
                            
                            <motion.div
                                className="glass-panel"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1.1rem 2rem',
                                    borderRadius: '3rem',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                                {t('hero.trust')}
                            </motion.div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    opacity: 0.6
                }}
            >
                <motion.div
                    animate={prefersReducedMotion ? { opacity: 1 } : { y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
                >
                    <ChevronDown size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
