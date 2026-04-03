import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const skills = [
    {
        category: 'Frontend',
        color: '#3b82f6',
        items: [
            { name: 'React', level: 90 },
            { name: 'Next.js', level: 75 },
            { name: 'TypeScript', level: 80 },
            { name: 'Tailwind CSS', level: 85 },
            { name: 'Framer Motion', level: 80 },
        ]
    },
    {
        category: 'Backend & DB',
        color: '#10b981',
        items: [
            { name: 'Node.js', level: 70 },
            { name: 'SQL / PostgreSQL', level: 75 },
            { name: 'Supabase', level: 85 },
            { name: 'REST APIs', level: 80 },
            { name: 'Edge Functions', level: 65 },
        ]
    },
    {
        category: 'Tools & Services',
        color: '#a78bfa',
        items: [
            { name: 'Docker', level: 60 },
            { name: 'Stripe', level: 70 },
            { name: 'Git / GitHub', level: 85 },
            { name: 'Vite', level: 90 },
            { name: 'Cloudflare', level: 65 },
        ]
    }
];

const techBadges = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '𝙏𝙎' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Tailwind', icon: '🌊' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Cloudflare', icon: '☁️' },
    { name: 'Git', icon: '🔀' },
    { name: 'Vite', icon: '⚡' },
];

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section className="section" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                height: '60vw',
                background: 'radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontSize: 'clamp(2rem, 4vw, 3rem)'
                }}>
                    {t('skills.title')}{' '}
                    <span style={{
                        background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t('skills.title_accent')}
                    </span>
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginBottom: '4rem',
                    maxWidth: '600px',
                    margin: '0 auto 4rem auto'
                }}>
                    {t('skills.subtitle')}
                </p>

                {/* Tech Badges Strip */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    marginBottom: '4rem'
                }}>
                    {techBadges.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4, scale: 1.05 }}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '2rem',
                                background: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                cursor: 'default',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.boxShadow = 'var(--accent-glow)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>{tech.icon}</span>
                            <span style={{ fontWeight: 500 }}>{tech.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Skill Category Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((category, catIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.15, duration: 0.5 }}
                            style={{
                                background: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '1.5rem',
                                padding: '2rem',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Card glow top accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: `linear-gradient(to right, ${category.color}, transparent)`,
                                borderRadius: '1.5rem 1.5rem 0 0'
                            }} />

                            <h3 style={{
                                fontWeight: 700,
                                marginBottom: '1.5rem',
                                color: category.color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.85rem'
                            }}>
                                {category.category}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {category.items.map((skill, skillIdx) => (
                                    <div key={skill.name}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.4rem'
                                        }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{skill.level}%</span>
                                        </div>
                                        <div style={{
                                            height: '6px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '10px',
                                            overflow: 'hidden'
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1,
                                                    delay: catIdx * 0.15 + skillIdx * 0.1,
                                                    ease: 'easeOut'
                                                }}
                                                style={{
                                                    height: '100%',
                                                    borderRadius: '10px',
                                                    background: `linear-gradient(to right, ${category.color}aa, ${category.color})`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
