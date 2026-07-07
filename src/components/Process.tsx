import { MessageCircle, Search, Palette, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Process = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const steps = [
        { num: "01", icon: MessageCircle, text: t('process.step1') },
        { num: "02", icon: Search, text: t('process.step2') },
        { num: "03", icon: Palette, text: t('process.step3') },
        { num: "04", icon: Rocket, text: t('process.step4') }
    ];

    return (
        <section id="process" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem',
            backgroundColor: 'var(--bg-color)',
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '3rem' : '5rem',
                    alignItems: 'flex-start'
                }}>
                    {/* Left side: Heading */}
                    <div style={{ flex: 1, position: 'sticky', top: '120px', textAlign: isMobile ? 'center' : 'left' }}>
                        <Reveal>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.0,
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem'
                            }}>
                                {t('process.title')} <br />
                                <span style={{ color: 'var(--accent-red)' }}>{t('process.titleAccent')}</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 400 }}>
                                {t('process.trust')}
                            </p>
                        </Reveal>
                    </div>

                    {/* Right side: Typographic Stack */}
                    <div style={{ 
                        flex: 1.2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {steps.map((step, index) => (
                            <Reveal 
                                key={index} 
                                delay={index * 0.1}
                                direction="up"
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '24px',
                                    padding: '2rem 0',
                                    borderBottom: index === steps.length - 1 ? 'none' : '1px solid var(--border-secondary)',
                                    textAlign: 'left'
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '4rem',
                                        fontWeight: 900,
                                        color: '#111111',
                                        width: '70px',
                                        lineHeight: 1.0
                                    }}>
                                        {step.num}
                                    </div>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#FAFAFA',
                                        border: '1px solid var(--border-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-primary)',
                                        flexShrink: 0
                                    }}>
                                        <step.icon size={18} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ 
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '18px', 
                                            fontWeight: 600, 
                                            color: 'var(--text-primary)',
                                            margin: 0,
                                            lineHeight: 1.3
                                        }}>{step.text}</h3>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
