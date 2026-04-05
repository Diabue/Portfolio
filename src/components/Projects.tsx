import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ArrowLeft, Eye, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import project3Img from '../assets/project3.png';
import project4Img from '../assets/project4.png';
import projekt5Img from '../assets/projekt5.png';

const Projects = () => {
    const { t } = useTranslation();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: t('projects.p1_title'),
            description: t('projects.p1_desc'),
            url: "/sala-legend/index.html",
            color: "#c39b57",
            tag: "Event Venue",
            image: project4Img,
            result: "+40% Rezerwacji"
        },
        {
            id: 2,
            title: t('projects.p2_title'),
            description: t('projects.p2_desc'),
            url: "/fineppf/index.html",
            color: "#2563eb",
            tag: "Detailing Studio",
            image: projekt5Img,
            result: "Klienci Premium"
        },
        {
            id: 3,
            title: t('projects.p3_title'),
            description: t('projects.p3_desc'),
            url: "/crm-dashboard/index.html",
            color: "#8b5cf6",
            tag: "AI CRM",
            image: project3Img,
            result: "20h Oszczędności/Tydz"
        }
    ];

    const expandedProject = projects.find(p => p.id === expandedId);

    return (
        <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '6rem 2rem' }}>
            <div className="container">
                <Reveal>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '4rem',
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em'
                    }}>
                        {t('projects.title')}{' '}
                        <span style={{
                            background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>{t('projects.titleAccent')}</span>
                    </h2>
                </Reveal>

                <div className="projects-grid">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            idx={idx}
                            isHovered={hoveredId === project.id}
                            onHover={setHoveredId}
                            onClick={() => setExpandedId(project.id)}
                            t={t}
                            direction={idx % 2 === 0 ? 'left' : 'right'}
                        />
                    ))}
                </div>
            </div>

            {createPortal(
                <AnimatePresence>
                    {expandedId && expandedProject && (
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.95)', zIndex: 2000,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', padding: '1.5rem'
                            }}
                            onClick={() => setExpandedId(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                style={{
                                    width: '100%', height: '90vh', maxWidth: '1400px', borderRadius: '1.5rem',
                                    border: `1px solid ${expandedProject.color}44`, boxShadow: `0 0 60px ${expandedProject.color}22`,
                                    display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0c1322'
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div style={{
                                    padding: '1rem 1.75rem', borderBottom: `1px solid ${expandedProject.color}22`,
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.9)', flexShrink: 0
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <button onClick={() => setExpandedId(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                            <ArrowLeft size={16} /> Wróć
                                        </button>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{expandedProject.title}</h3>
                                    </div>
                                    <a href={expandedProject.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', background: expandedProject.color, borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                                        Otwórz Live <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div style={{ flex: 1, position: 'relative', background: '#000' }}>
                                    <iframe src={expandedProject.url} style={{ width: '100%', height: '100%', border: 'none' }} />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

const ProjectCard = ({ project, idx, isHovered, onHover, onClick, t }: any) => (
    <Reveal delay={idx * 0.1}>
        <motion.div
            onClick={onClick}
            onHoverStart={() => onHover(project.id)}
            onHoverEnd={() => onHover(null)}
            className="glass-panel"
            style={{ borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer', position: 'relative', border: isHovered ? `1px solid ${project.color}55` : '1px solid rgba(167, 139, 250, 0.15)' }}
        >
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(2, 6, 23, 0.9))', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: project.color, fontWeight: 700, fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '2rem', backdropFilter: 'blur(5px)' }}>
                        <TrendingUp size={16} /> {project.result}
                    </div>
                </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{project.title}</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.tag}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{project.description}</p>
                <div style={{ color: project.color, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t('projects.open')} <Eye size={16} />
                </div>
            </div>
        </motion.div>
    </Reveal>
);

export default Projects;
