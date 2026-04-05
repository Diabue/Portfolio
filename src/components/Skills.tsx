import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

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
        <section id="skills">
            <div className="container">
                <Reveal>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '1rem',
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)'
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
                </Reveal>

                <Reveal delay={0.2}>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem auto'
                    }}>
                        {t('skills.subtitle')}
                    </p>
                </Reveal>

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
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5, scale: 1.1 }}
                            className="glass-panel"
                            style={{
                                padding: '0.6rem 1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                cursor: 'default'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>
                            <span style={{ fontWeight: 600 }}>{tech.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Skill Category Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((category, catIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.1 }}
                            className="glass-panel"
                            style={{
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Accent line */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '4px',
                                height: '100%',
                                background: category.color
                            }} />

                            <h3 style={{
                                fontWeight: 700,
                                marginBottom: '2rem',
                                color: '#fff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                fontSize: '0.9rem',
                                opacity: 0.8
                            }}>
                                {category.category}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {category.items.map((skill, skillIdx) => (
                                    <div key={skill.name}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.6rem'
                                        }}>
                                            <span style={{ fontSize: '1rem', fontWeight: 500, color: '#e2e8f0' }}>{skill.name}</span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{skill.level}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.5 + (skillIdx * 0.1),
                                                    ease: 'circOut'
                                                }}
                                                style={{
                                                    height: '100%',
                                                    borderRadius: '10px',
                                                    background: `linear-gradient(90deg, ${category.color}88, ${category.color})`,
                                                    boxShadow: `0 0 10px ${category.color}44`
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

