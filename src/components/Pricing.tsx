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
            backgroundColor: 'var(--bg-surface)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '3rem' : '5rem',
                    alignItems: 'stretch'
                }}>
                    {/* Left Column: Heading and Factors */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isMobile ? 'center' : 'left' }}>
                        <Reveal direction="left">
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.0,
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem'
                            }}>
                                {t('pricing.title')} <span style={{ color: 'var(--accent-red)' }}>{t('pricing.titleAccent')}</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', fontWeight: 400 }}>
                                {t('pricing.variables')}
                            </p>
                        </Reveal>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {factors.map((factor, i) => (
                                <Reveal key={i} delay={i * 0.1} direction="left">
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '1rem',
                                        background: '#FAFAFA',
                                        padding: '1.25rem 1.5rem',
                                        borderRadius: '0px', /* Sharp edges */
                                        border: '1px solid var(--border-secondary)',
                                    }}>
                                        <div style={{ 
                                            width: '36px', 
                                            height: '36px', 
                                            backgroundColor: '#111111',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <factor.icon size={18} />
                                        </div>
                                        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{factor.text}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Card */}
                    <div style={{ flex: 1, display: 'flex' }}>
                        <Reveal direction="right" width="100%">
                            <div style={{
                                padding: '3rem 2.5rem',
                                height: '100%',
                                borderRadius: '0px', /* Sharp edges */
                                background: '#111111', /* Nike Black inverted card */
                                border: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '2rem',
                                color: '#FFFFFF',
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px', 
                                        backgroundColor: '#FFFFFF',
                                        color: '#111111',
                                        padding: '6px 16px',
                                        borderRadius: '30px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        fontFamily: 'var(--font-body)',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <Info size={14} /> GWARANCJA UCZCIWOŚCI
                                    </div>
                                    <h4 style={{ 
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '2rem', 
                                        fontWeight: 800, 
                                        textTransform: 'uppercase',
                                        lineHeight: 1.1,
                                        marginBottom: '0.5rem',
                                        color: '#FFFFFF' 
                                    }}>{t('pricing.trust1')}</h4>
                                    <p style={{ color: 'var(--text-secondary-dark)', fontWeight: 500, margin: 0 }}>{t('pricing.trust2')}</p>
                                </div>

                                <div style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '1.25rem', 
                                    marginTop: '1rem',
                                    borderTop: '1px solid var(--border-dark)',
                                    paddingTop: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <CheckCircle2 color="var(--accent-orange)" size={20} />
                                        <span style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{t('pricing.simple')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <CheckCircle2 color="var(--accent-blue)" size={20} />
                                        <span style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{t('pricing.advanced')}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
