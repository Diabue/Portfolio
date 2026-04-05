import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
                            {t('social.title')} <span style={{ color: 'var(--accent-color)' }}>{t('social.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="contact-grid" style={{ maxWidth: '1200px', gap: '2.5rem' }}>
                    {testimonials.map((testimonial, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.15} 
                            direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="glass-panel"
                                style={{
                                    padding: '2.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'left',
                                    position: 'relative'
                                }}
                            >
                                <Quote size={40} style={{ color: 'var(--accent-color)', opacity: 0.15, position: 'absolute', top: '1.5rem', right: '1.5rem' }} />
                                
                                <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24' }}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="#fbbf24" strokeWidth={0} />
                                    ))}
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    color: 'var(--text-primary)',
                                    fontWeight: 400,
                                    fontStyle: 'italic',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    "{testimonial.text}"
                                </p>

                                <div style={{
                                    marginTop: 'auto',
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--accent-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{testimonial.author}</span>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
