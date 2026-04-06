import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ArrowLeft, Eye, TrendingUp, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import project3Img from '../assets/project3.png';
import project4Img from '../assets/project4.png';
import projekt5Img from '../assets/projekt5.png';

const Projects = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: t('projects.p1_title'),
            problem: t('projects.p1_prob'),
            solution: t('projects.p1_sol'),
            result: t('projects.p1_res'),
            url: "/sala-legend/index.html",
            color: "#c39b57",
            tag: "Event Venue",
            image: project4Img,
            metric: "+40% Rezerwacji"
        },
        {
            id: 2,
            title: t('projects.p2_title'),
            problem: t('projects.p2_prob'),
            solution: t('projects.p2_sol'),
            result: t('projects.p2_res'),
            url: "/fineppf/index.html",
            color: "#2563eb",
            tag: "Detailing Studio",
            image: projekt5Img,
            metric: "Klient Premium"
        },
        {
            id: 3,
            title: t('projects.p3_title'),
            problem: t('projects.p3_prob'),
            solution: t('projects.p3_sol'),
            result: t('projects.p3_res'),
            url: "/crm-dashboard/index.html",
            color: "#8b5cf6",
            tag: "Software Solution",
            image: project3Img,
            metric: "20h/Tydz Oszczędności"
        }
    ];

    const expandedProject = projects.find(p => p.id === expandedId);

    return (
        <section id="projects" style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem' 
        }}>
            <div className="container">
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1
                        }}>
                            {t('projects.title')}{' '}
                            <span style={{
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>{t('projects.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="projects-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', 
                    gap: isMobile ? '1.5rem' : '2.5rem' 
                }}>
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            idx={idx}
                            isHovered={hoveredId === project.id}
                            onHover={setHoveredId}
                            onClick={() => setExpandedId(project.id)}
                            t={t}
                            isMobile={isMobile}
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
                                display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', padding: isMobile ? '0' : '1.5rem'
                            }}
                            onClick={() => setExpandedId(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                style={{
                                    width: '100%', height: isMobile ? '100vh' : '90vh', maxWidth: '1400px', borderRadius: isMobile ? '0' : '1.5rem',
                                    border: `1px solid ${expandedProject.color}44`, boxShadow: `0 0 60px ${expandedProject.color}22`,
                                    display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0c1322'
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div style={{
                                    padding: '1rem 1.25rem', borderBottom: `1px solid ${expandedProject.color}22`,
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.9)', flexShrink: 0
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button onClick={() => setExpandedId(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                                            <ArrowLeft size={14} /> Wróć
                                        </button>
                                        <h3 style={{ margin: 0, fontSize: isMobile ? '0.9rem' : '1.2rem', fontWeight: 600 }}>{expandedProject.title}</h3>
                                    </div>
                                    <a href={expandedProject.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', background: expandedProject.color, borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                                        Live <ExternalLink size={12} />
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

const ProjectCard = ({ project, idx, isHovered, onHover, onClick, t, isMobile }: any) => (
    <Reveal delay={idx * 0.15} direction={idx % 2 === 0 ? 'left' : 'right'}>
        <motion.div
            onClick={onClick}
            onHoverStart={() => onHover(project.id)}
            onHoverEnd={() => onHover(null)}
            className="glass-panel"
            style={{ 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                cursor: 'pointer', 
                position: 'relative', 
                border: isHovered ? `1px solid ${project.color}55` : '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)'
            }}
        >
            <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(2, 6, 23, 0.95))' }} />
                
                <div style={{ position: 'absolute', bottom: isMobile ? '1rem' : '1.5rem', left: isMobile ? '1rem' : '1.5rem', right: isMobile ? '1rem' : '1.5rem' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: project.color, 
                        fontWeight: 800, 
                        fontSize: isMobile ? '0.85rem' : '0.95rem', 
                        backgroundColor: 'rgba(0,0,0,0.5)', 
                        padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.25rem', 
                        borderRadius: '3rem', 
                        backdropFilter: 'blur(10px)', 
                        border: `1px solid ${project.color}33` 
                    }}>
                        <TrendingUp size={isMobile ? 16 : 18} strokeWidth={2.5} /> {project.metric}
                    </div>
                </div>
            </div>

            <div style={{ padding: isMobile ? '1.5rem' : '2rem', display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
                <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{project.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <AlertCircle size={isMobile ? 16 : 18} color="#ef4444" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.85rem' : '0.95rem', margin: 0 }}>{project.problem}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <Lightbulb size={isMobile ? 16 : 18} color="#eab308" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.85rem' : '0.95rem', margin: 0 }}>{project.solution}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <CheckCircle2 size={isMobile ? 16 : 18} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 700, margin: 0 }}>{project.result}</p>
                    </div>
                </div>

                <div style={{ 
                    marginTop: '0.25rem',
                    color: project.color, 
                    fontWeight: 700, 
                    fontSize: isMobile ? '0.8rem' : '0.9rem', 
                    textTransform: 'uppercase', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    letterSpacing: '0.05em'
                }}>
                    {t('projects.open')} <Eye size={18} />
                </div>
            </div>
        </motion.div>
    </Reveal>
);

export default Projects;
