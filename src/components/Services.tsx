import { Globe, Target, ShoppingBag, CheckCircle2, Users, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: Target,
            title: t('services.s2_title'),
            price: t('services.s2_price'),
            description: t('services.s2_problem'),
            perfect: t('services.s2_perfect'),
            result: t('services.s2_result'),
            color: '#3b82f6'
        },
        {
            icon: Globe,
            title: t('services.s1_title'),
            price: t('services.s1_price'),
            description: t('services.s1_problem'),
            perfect: t('services.s1_perfect'),
            result: t('services.s1_result'),
            color: '#a78bfa'
        },
        {
            icon: ShoppingBag,
            title: t('services.s3_title'),
            price: t('services.s3_price'),
            description: t('services.s3_problem'),
            perfect: t('services.s3_perfect'),
            result: t('services.s3_result'),
            color: '#8b5cf6'
        },
        {
            icon: CreditCard,
            title: t('services.s4_title'),
            price: t('services.s4_price'),
            description: t('services.s4_problem'),
            perfect: t('services.s4_perfect'),
            result: t('services.s4_result'),
            color: '#10b981'
        }
    ];

    return (
        <section id="services" style={{
            minHeight: '100vh',
            padding: '6rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '1.5rem',
                    justifyContent: 'center',
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                    {services.map((service, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.1} 
                            direction="up"
                        >
                            <motion.div 
                                whileHover={{ y: -10, boxShadow: `0 20px 40px -20px ${service.color}33` }}
                                className="glass-panel"
                                style={{
                                    padding: '2.5rem 2rem',
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '1rem',
                                        backgroundColor: `${service.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: service.color
                                    }}>
                                        <service.icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <div style={{
                                        backgroundColor: `${service.color}15`,
                                        color: service.color,
                                        padding: '0.4rem 1rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        border: `1px solid ${service.color}33`
                                    }}>
                                        {service.price}
                                    </div>
                                </div>
                                
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{service.title}</h3>
                                
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                    {service.description}
                                </p>

                                <div style={{ 
                                    padding: '1.25rem', 
                                    backgroundColor: 'rgba(255,255,255,0.03)', 
                                    borderRadius: '1rem', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    marginTop: 'auto'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        <Users size={16} color={service.color} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                                        <span>{service.perfect}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                                        <CheckCircle2 size={16} color="#10b981" />
                                        <span>{service.result}</span>
                                    </div>
                                </div>

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
