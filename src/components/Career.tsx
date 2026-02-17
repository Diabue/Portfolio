import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const Career = () => {
    const { t } = useTranslation();

    const experiences = [
        {
            role: t('career.role_edu'),
            company: t('career.school_edu'),
            period: t('career.period_edu'),
            description: t('career.desc_edu'),
            current: true
        },
        {
            role: t('career.role_dev'),
            company: t('career.company_freelance'),
            period: t('career.period_freelance'),
            description: t('career.desc_freelance'),
            current: true
        },
        {
            role: t('career.role_admin'),
            company: t('career.company_gk'),
            period: t('career.period_gk'),
            description: t('career.desc_gk'),
            current: false
        }
    ];

    return (
        <section className="section" style={{ position: 'relative' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    {t('career.title')}
                </h2>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {experiences.map((exp, index) => (
                        <Reveal key={index} direction="right" delay={index * 0.2} width="100%">
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                marginBottom: '3rem',
                                position: 'relative'
                            }}>
                                {/* Timeline Line (Visual only) */}
                                {index !== experiences.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '24px',
                                        top: '50px',
                                        bottom: '-50px',
                                        width: '2px',
                                        background: '#333'
                                    }} />
                                )}

                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: exp.current ? 'linear-gradient(135deg, var(--accent-color), #3b82f6)' : 'var(--surface-color)',
                                    border: '2px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    zIndex: 1,
                                    boxShadow: exp.current ? 'var(--accent-glow)' : 'none'
                                }}>
                                    <Briefcase size={20} color={exp.current ? '#fff' : 'var(--text-secondary)'} />
                                </div>

                                <div style={{
                                    background: 'var(--surface-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    flex: 1
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#fff' }}>{exp.role}</h3>
                                    <h4 style={{
                                        color: 'var(--accent-color)',
                                        marginBottom: '0.5rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 600
                                    }}>
                                        {exp.company}
                                    </h4>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '1rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        <Calendar size={16} />
                                        <span>{exp.period}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Career;
