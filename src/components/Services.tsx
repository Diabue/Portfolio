import { Globe, Target, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: Globe,
            title: t('services.s1_title'),
            problem: t('services.s1_problem'),
            result: t('services.s1_result'),
            color: '#a78bfa'
        },
        {
            icon: Target,
            title: t('services.s2_title'),
            problem: t('services.s2_problem'),
            result: t('services.s2_result'),
            color: '#3b82f6'
        },
        {
            icon: ShoppingBag,
            title: t('services.s3_title'),
            problem: t('services.s3_problem'),
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
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1
                        }}>
                            {t('services.title')} <span style={{ color: 'var(--accent-color)' }}>{t('services.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="projects-grid">
                    {services.map((service, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.15} 
                            direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}
                        >
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="glass-panel"
                                style={{
                                    padding: '3rem 2rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '1rem',
                                    backgroundColor: `rgba(167, 139, 250, 0.1)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: service.color,
                                    marginBottom: '0.5rem'
                                }}>
                                    <service.icon size={32} />
                                </div>
                                
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{service.title}</h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic' }}>
                                        "{service.problem}"
                                    </p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                                        {service.result}
                                    </p>
                                </div>

                                {/* Abstract accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    background: `radial-gradient(circle, ${service.color}22 0%, transparent 70%)`,
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
