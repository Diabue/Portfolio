import { MessageCircle, PhoneCall, Code2, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const Process = () => {
    const { t } = useTranslation();

    const steps = [
        { icon: MessageCircle, text: t('process.step1'), color: '#a78bfa' },
        { icon: PhoneCall, text: t('process.step2'), color: '#3b82f6' },
        { icon: Code2, text: t('process.step3'), color: '#8b5cf6' },
        { icon: Rocket, text: t('process.step4'), color: '#f59e0b' }
    ];

    return (
        <section id="process" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 2rem'
        }}>
            <div className="container">
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1
                        }}>
                            {t('process.title')} <span style={{ color: 'var(--accent-color)' }}>{t('process.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    {/* Visual Line */}
                    <div style={{
                        position: 'absolute',
                        left: '40px',
                        top: '40px',
                        bottom: '40px',
                        width: '2px',
                        background: 'linear-gradient(to bottom, var(--accent-color), transparent)',
                        opacity: 0.3,
                        zIndex: 0
                    }} />

                    {steps.map((step, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.1} 
                            direction={index % 2 === 0 ? 'left' : 'right'}
                        >
                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="glass-panel"
                                style={{
                                    padding: '1.5rem 2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    border: '1px solid var(--border-color)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--bg-color)',
                                    border: `2px solid ${step.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: step.color,
                                    flexShrink: 0,
                                    boxShadow: `0 0 15px ${step.color}33`,
                                    fontSize: '1.5rem',
                                    fontWeight: 800
                                }}>
                                    {index + 1}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <step.icon size={24} style={{ opacity: 0.7 }} />
                                    <p style={{
                                        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.4
                                    }}>
                                        {step.text}
                                    </p>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
