import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const FinalCTA = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    return (
        <section id="cta_final" style={{
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '5rem 1.5rem' : '8rem 2rem',
            backgroundColor: 'var(--bg-dark-section)', /* Stark dark section */
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <Reveal>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1.5px solid #FFFFFF',
                            color: '#FFFFFF',
                            padding: '4px 14px',
                            borderRadius: '30px',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-body)'
                        }}>
                            <Sparkles size={14} /> {t('projects.titleAccent')}
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.1}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            lineHeight: 0.90,
                            color: '#FFFFFF',
                            textTransform: 'uppercase',
                            padding: 0,
                            margin: 0
                        }}>
                            {t('cta_final.title')} <br />
                            <span style={{ color: 'var(--accent-red)' }}>
                                {t('cta_final.titleAccent')}
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                            color: 'var(--text-secondary-dark)',
                            lineHeight: 1.5,
                            maxWidth: '700px',
                            margin: '0 auto 1.5rem',
                            fontWeight: 400
                        }}>
                            {t('cta_final.text')}
                        </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <motion.button
                            onClick={() => navigate('/inquiry')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                backgroundColor: '#FFFFFF',
                                color: '#111111',
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
                                fontFamily: 'var(--font-body)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-secondary)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                        >
                            {t('cta_final.button')} <ArrowRight size={18} />
                        </motion.button>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
