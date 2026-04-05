import { Globe, Target, ShoppingBag, CheckCircle2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: Globe,
            title: t('services.s1_title'),
            description: t('services.s1_problem'),
            perfect: t('services.s1_perfect'),
            result: t('services.s1_result'),
            color: '#a78bfa'
        },
        {
            icon: Target,
            title: t('services.s2_title'),
            description: t('services.s2_problem'),
            perfect: t('services.s2_perfect'),
            result: t('services.s2_result'),
            color: '#3b82f6'
        },
        {
            icon: ShoppingBag,
            title: t('services.s3_title'),
            description: t('services.s3_problem'),
            perfect: t('services.s3_perfect'),
            result: t('services.s3_result'),
            color: '#8b5cf6'
        }
    ];

    return (
        <section id="services" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 2rem'
        }}>
            <div className="container">
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1,
                            marginBottom: '1rem'
                        }}>
                            {t('services.title')} <span style={{ 
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                             }}>{t('services.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="projects-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '2.5rem',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {services.map((service, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.15} 
                            direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}
                        >
                            <motion.div 
                                whileHover={{ y: -10, boxShadow: `0 20px 40px -20px ${service.color}33` }}
                                className="glass-panel"
                                style={{
                                    padding: '3rem 2.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.03)'
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '1.25rem',
                                    backgroundColor: `${service.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: service.color,
                                    marginBottom: '1rem'
                                }}>
                                    <service.icon size={32} strokeWidth={2.5} />
                                </div>
                                
                                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{service.title}</h3>
                                
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                                    {service.description}
                                </p>

                                <div style={{ 
                                    padding: '1.25rem', 
                                    backgroundColor: 'rgba(255,255,255,0.03)', 
                                    borderRadius: '1rem', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    marginTop: 'auto'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <Users size={18} color={service.color} />
                                        <span>{service.perfect}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
                                        <CheckCircle2 size={18} color="#10b981" />
                                        <span>{service.result}</span>
                                    </div>
                                </div>

                                {/* Abstract accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    width: '120px',
                                    height: '120px',
                                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                                    zIndex: 0
                                }} />
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
