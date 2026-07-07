import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const WhyMe = () => {
    const { t } = useTranslation();

    const points = [
        {
            num: "01",
            title: t('whyme.p1_title'),
            desc: t('whyme.p1_desc')
        },
        {
            num: "02",
            title: t('whyme.p2_title'),
            desc: t('whyme.p2_desc')
        },
        {
            num: "03",
            title: t('whyme.p3_title'),
            desc: t('whyme.p3_desc')
        },
        {
            num: "04",
            title: t('whyme.p4_title'),
            desc: t('whyme.p4_desc')
        }
    ];

    return (
        <section id="whyme" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface)',
            padding: '6rem 2rem'
        }}>
            <div className="container">
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.0,
                            textTransform: 'uppercase'
                        }}>
                            {t('whyme.title')} <span style={{ color: 'var(--accent-red)' }}>{t('whyme.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '40px',
                    maxWidth: '1440px',
                    margin: '0 auto'
                }}>
                    {points.map((point, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.1}
                            direction="up"
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                padding: '1.5rem 0',
                                borderTop: '1.5px solid var(--border-secondary)',
                                textAlign: 'left'
                            }}>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '3.5rem',
                                    fontWeight: 900,
                                    color: 'var(--border-secondary)',
                                    lineHeight: 1.0
                                }}>
                                    {point.num}
                                </div>
                                <h3 style={{ 
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.5rem', 
                                    fontWeight: 800, 
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.01em',
                                    color: 'var(--text-primary)',
                                    margin: 0
                                }}>
                                    {point.title}
                                </h3>
                                <p style={{ 
                                    color: 'var(--text-secondary)', 
                                    lineHeight: 1.6, 
                                    fontSize: '15px',
                                    margin: 0 
                                }}>
                                    {point.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyMe;
