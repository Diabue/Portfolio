import { useTranslation } from 'react-i18next';
import { CheckCircle2, Info, Layout, Settings, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Pricing = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const factors = [
        { icon: Layout, text: t('pricing.f1') },
        { icon: Settings, text: t('pricing.f2') },
        { icon: Zap, text: t('pricing.f3') }
    ];

    return (
        <section id="pricing" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 2rem',
            backgroundColor: 'rgba(15, 23, 42, 0.3)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '3rem' : '5rem',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <Reveal direction="left">
                            <h2 style={{
                                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                                marginBottom: '1.5rem'
                            }}>
                                {t('pricing.title')} <span style={{ 
                                    background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                 }}>{t('pricing.titleAccent')}</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', fontWeight: 500 }}>
                                {t('pricing.variables')}
                            </p>
                        </Reveal>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {factors.map((factor, i) => (
                                <Reveal key={i} delay={i * 0.1} direction="left">
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        padding: '1.25rem 1.5rem',
                                        borderRadius: '1.25rem',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <div style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '0.75rem', 
                                            backgroundColor: 'rgba(167, 139, 250, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#a78bfa',
                                            flexShrink: 0
                                        }}>
                                            <factor.icon size={20} />
                                        </div>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>{factor.text}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, width: '100%' }}>
                        <Reveal direction="right">
                            <div className="glass-panel" style={{
                                padding: '3rem',
                                borderRadius: '2rem',
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
                                border: '1px solid rgba(167, 139, 250, 0.2)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem',
                                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                        color: '#10b981',
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        marginBottom: '1.5rem'
                                    }}>
                                        <Info size={16} /> GWARANCJA UCZCIWOŚCI
                                    </div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('pricing.trust1')}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{t('pricing.trust2')}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <CheckCircle2 color="#10b981" size={24} />
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t('pricing.simple')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <CheckCircle2 color="#3b82f6" size={24} />
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t('pricing.advanced')}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default Pricing;
