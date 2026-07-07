import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const SocialProof = () => {
    const { t } = useTranslation();

    const testimonials = [
        { author: t('social.t1_author'), text: t('social.t1_text'), rating: 5 },
        { author: t('social.t2_author'), text: t('social.t2_text'), rating: 5 },
        { author: t('social.t3_author'), text: t('social.t3_text'), rating: 5 }
    ];

    return (
        <section id="social" style={{
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
                            {t('social.title')} <span style={{ color: 'var(--accent-red)' }}>{t('social.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    maxWidth: '1440px',
                    margin: '0 auto'
                }}>
                    {testimonials.map((testimonial, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.15} 
                            direction="up"
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                padding: '2rem 0',
                                borderTop: '1.5px solid var(--border-secondary)',
                                textAlign: 'left',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', gap: '2px', color: 'var(--text-primary)' }}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={14} fill="var(--text-primary)" strokeWidth={0} />
                                    ))}
                                </div>

                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '17px',
                                    lineHeight: 1.6,
                                    color: 'var(--text-primary)',
                                    fontWeight: 400,
                                    fontStyle: 'italic',
                                    margin: 0
                                }}>
                                    "{testimonial.text}"
                                </p>

                                <div style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: '#111111',
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        fontFamily: 'var(--font-body)'
                                    }}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <span style={{ 
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '16px',
                                        fontWeight: 800, 
                                        textTransform: 'uppercase',
                                        color: 'var(--text-primary)' 
                                    }}>{testimonial.author}</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
