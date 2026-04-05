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
            current: true
        }
    ];

    return (
        <section id="career">
            <div className="container">
                <Reveal>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        marginBottom: '4rem',
                        textAlign: 'center'
                    }}>
                        {t('career.title')}
                    </h2>
                </Reveal>

                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    {experiences.map((exp, index) => (
                        <Reveal key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
                            <div style={{
                                display: 'flex',
                                gap: '2.5rem',
                                marginBottom: '4rem',
                                position: 'relative'
                            }}>
                                {/* Connection Dot */}
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: exp.current ? 'linear-gradient(135deg, var(--accent-color), #3b82f6)' : '#1e293b',
                                    border: '2px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    zIndex: 2,
                                    boxShadow: exp.current ? 'var(--accent-glow)' : 'none',
                                    marginTop: '1rem'
                                }}>
                                    <Briefcase size={24} color={exp.current ? '#fff' : 'var(--text-secondary)'} />
                                </div>

                                <div className="glass-panel" style={{
                                    padding: '2rem',
                                    flex: 1,
                                    position: 'relative'
                                }}>
                                    {exp.current && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '1.5rem',
                                            right: '1.5rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '2rem',
                                            background: 'rgba(167, 139, 250, 0.15)',
                                            color: 'var(--accent-color)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            border: '1px solid rgba(167, 139, 250, 0.3)'
                                        }}>
                                            PRESENT
                                        </div>
                                    )}

                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>{exp.role}</h3>
                                    <h4 style={{
                                        color: 'var(--accent-color)',
                                        marginBottom: '1rem',
                                        fontSize: '1.2rem',
                                        fontWeight: 600
                                    }}>
                                        {exp.company}
                                    </h4>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '1.5rem',
                                        fontSize: '0.95rem',
                                        opacity: 0.8
                                    }}>
                                        <Calendar size={18} />
                                        <span>{exp.period}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
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

