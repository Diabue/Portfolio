import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Career = () => {
    const { t } = useTranslation();

    const experiences = [
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
        <section className="section" style={{ background: 'var(--surface-color)' }}>
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
                        <div key={index} style={{
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
                                background: exp.current ? 'var(--accent-color)' : '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                zIndex: 1
                            }}>
                                <Briefcase size={20} color="#fff" />
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
                                <h4 style={{
                                    color: 'var(--accent-color)',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.1rem'
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
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Career;
