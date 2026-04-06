import { MessageCircle, Search, Palette, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Process = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const steps = [
        { icon: MessageCircle, text: t('process.step1'), color: '#a78bfa' },
        { icon: Search, text: t('process.step2'), color: '#3b82f6' },
        { icon: Palette, text: t('process.step3'), color: '#8b5cf6' },
        { icon: Rocket, text: t('process.step4'), color: '#f59e0b' }
    ];

    const linePosition = isMobile ? '20px' : '50%';
    const cardMaxWidth = isMobile ? '100%' : '430px';

    return (
        <section id="process" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '6rem 1rem' : '8rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                <Reveal width="100%">
                    <div style={{ marginBottom: isMobile ? '3rem' : '6rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1,
                            marginBottom: '1rem'
                        }}>
                            {t('process.title')} <span style={{ 
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                             }}>{t('process.titleAccent')}</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 500 }}>
                            {t('process.trust')}
                        </p>
                    </div>
                </Reveal>

                <div style={{ 
                    position: 'relative', 
                    maxWidth: '1000px', 
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '2.5rem' : '4rem'
                }}>
                    {/* Central Axis Line */}
                    <div className="process-line" style={{
                        position: 'absolute',
                        left: linePosition,
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        background: 'linear-gradient(to bottom, #a78bfa, #3b82f6, transparent)',
                        transform: isMobile ? 'none' : 'translateX(-50%)',
                        opacity: 0.3,
                        display: 'block'
                    }} />

                    {steps.map((step, index) => {
                        const isLeft = !isMobile && index % 2 === 0;
                        
                        return (
                            <div key={index} style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
                                position: 'relative',
                                paddingLeft: isMobile ? '50px' : '0'
                            }}>
                                {/* Step Number on Line */}
                                <div style={{
                                    position: 'absolute',
                                    left: isMobile ? '-30px' : '50%',
                                    top: '50%',
                                    transform: isMobile ? 'translateY(-50%)' : 'translate(-50%, -50%)',
                                    width: isMobile ? '40px' : '50px',
                                    height: isMobile ? '40px' : '50px',
                                    borderRadius: '50%',
                                    background: '#0f172a',
                                    border: `2px solid ${isEven(index) ? '#a78bfa' : '#3b82f6'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: isMobile ? '1rem' : '1.25rem',
                                    fontWeight: 900,
                                    color: '#fff',
                                    zIndex: 2,
                                    boxShadow: `0 0 15px ${isEven(index) ? '#a78bfa33' : '#3b82f633'}`,
                                }}>
                                    {index + 1}
                                </div>

                                <Reveal 
                                    width="100%" 
                                    direction={isMobile ? 'left' : (isLeft ? 'right' : 'left')} 
                                    delay={index * 0.1}
                                >
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end')
                                    }}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="glass-panel"
                                            style={{
                                                width: '100%',
                                                maxWidth: cardMaxWidth,
                                                padding: isMobile ? '1.5rem' : '2.5rem',
                                                borderRadius: '2rem',
                                                textAlign: isMobile ? 'left' : (isLeft ? 'right' : 'left'),
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                background: 'rgba(255,255,255,0.02)',
                                                display: 'flex',
                                                flexDirection: (isMobile || !isLeft) ? 'row-reverse' : 'row',
                                                alignItems: 'center',
                                                gap: isMobile ? '1rem' : '1.5rem',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ 
                                                    fontSize: isMobile ? '1.1rem' : '1.4rem', 
                                                    fontWeight: 800, 
                                                    color: '#fff', 
                                                    marginBottom: '0.25rem',
                                                    lineHeight: 1.2
                                                }}>{step.text}</h3>
                                            </div>
                                            <div style={{
                                                width: isMobile ? '40px' : '56px',
                                                height: isMobile ? '40px' : '56px',
                                                borderRadius: '0.75rem',
                                                backgroundColor: `${step.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: step.color,
                                                flexShrink: 0
                                            }}>
                                                <step.icon size={isMobile ? 22 : 28} />
                                            </div>
                                        </motion.div>
                                    </div>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1000px',
                height: '1000px',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

const isEven = (num: number) => (num + 1) % 2 === 0;

export default Process;
