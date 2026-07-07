import { Target, Globe, ShoppingBag, CreditCard, Users, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
            badge: "LP"
        },
        {
            icon: Globe,
            title: t('services.s1_title'),
            price: t('services.s1_price'),
            description: t('services.s1_problem'),
            perfect: t('services.s1_perfect'),
            result: t('services.s1_result'),
            badge: "HOT"
        },
        {
            icon: ShoppingBag,
            title: t('services.s3_title'),
            price: t('services.s3_price'),
            description: t('services.s3_problem'),
            perfect: t('services.s3_perfect'),
            result: t('services.s3_result'),
            badge: "E-COM"
        },
        {
            icon: CreditCard,
            title: t('services.s4_title'),
            price: t('services.s4_price'),
            description: t('services.s4_problem'),
            perfect: t('services.s4_perfect'),
            result: t('services.s4_result'),
            badge: "PRO"
        }
    ];

    return (
        <section id="services" style={{
            minHeight: '80vh',
            padding: '6rem 2rem',
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div className="container">
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.0,
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>
                            {t('services.title')} <span style={{ color: 'var(--accent-red)' }}>{t('services.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="projects-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '16px',
                    justifyContent: 'center',
                    maxWidth: '1440px',
                    margin: '0 auto'
                }}>
                    {services.map((service, index) => (
                        <Reveal 
                            key={index} 
                            delay={index * 0.1} 
                            direction="up"
                        >
                            <div 
                                className="glass-panel"
                                style={{
                                    padding: '2.5rem 2rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    border: '1px solid var(--border-secondary)',
                                    borderRadius: '0px', /* Sharp corners */
                                    backgroundColor: 'var(--bg-surface)',
                                    textAlign: 'left',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        color: 'var(--accent-red)',
                                        border: '1.5px solid var(--accent-red)',
                                        padding: '2px 8px',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {service.badge}
                                    </span>
                                    <span style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        color: 'var(--text-primary)'
                                    }}>
                                        {service.price}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <service.icon size={22} color="var(--text-primary)" strokeWidth={2} />
                                    <h3 style={{ 
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.75rem', 
                                        fontWeight: 800, 
                                        letterSpacing: '-0.02em', 
                                        color: 'var(--text-primary)',
                                        margin: 0
                                    }}>
                                        {service.title}
                                    </h3>
                                </div>
                                
                                <p style={{ 
                                    color: 'var(--text-secondary)', 
                                    fontSize: '15px', 
                                    lineHeight: 1.6,
                                    margin: 0 
                                }}>
                                    {service.description}
                                </p>

                                <div style={{ 
                                    padding: '1.25rem 0 0 0', 
                                    borderTop: '1px solid var(--border-secondary)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    marginTop: 'auto'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                        <Users size={16} color="var(--text-secondary)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                                        <span>{service.perfect}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                                        <CheckCircle2 size={16} color="var(--text-primary)" />
                                        <span>{service.result}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
