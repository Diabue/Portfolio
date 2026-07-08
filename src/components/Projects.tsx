import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ArrowLeft, Eye, TrendingUp, DollarSign, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import project3Img from '../assets/project3.webp';
import project4Img from '../assets/project4.webp';
import projekt5Img from '../assets/projekt5.webp';

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
            color: "var(--accent-red)",
            tag: "Event Venue",
            image: project4Img,
            imagePosition: 'center',
            metric: t('projects.p1_metric')
        },
        {
            id: 2,
            title: t('projects.p2_title'),
            problem: t('projects.p2_prob'),
            solution: t('projects.p2_sol'),
            result: t('projects.p2_res'),
            url: "/fineppf/index.html",
            color: "var(--accent-blue)",
            tag: "Detailing Studio",
            image: projekt5Img,
            imagePosition: 'left',
            metric: t('projects.p2_metric')
        },
        {
            id: 3,
            title: t('projects.p3_title'),
            problem: t('projects.p3_prob'),
            solution: t('projects.p3_sol'),
            result: t('projects.p3_res'),
            url: "/crm-dashboard/index.html",
            color: "var(--accent-orange)",
            tag: "Software Solution",
            image: project3Img,
            imagePosition: 'left',
            metric: t('projects.p3_metric')
        }
    ];

    const expandedProject = projects.find(p => p.id === expandedId);

    return (
        <section id="projects" style={{ 
            minHeight: '85vh', 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-color)',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem' 
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
                            textTransform: 'uppercase'
                        }}>
                            {t('projects.title')}{' '}
                            <span style={{ color: 'var(--accent-red)' }}>{t('projects.titleAccent')}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="projects-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                    gap: '12px' /* Tight athletic gap */
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
                                position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 17, 17, 0.95)', zIndex: 2000,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '0' : '2rem'
                            }}
                            onClick={() => setExpandedId(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                                style={{
                                    width: '100%', height: isMobile ? '100vh' : '90vh', maxWidth: '1440px', borderRadius: '0px',
                                    border: '1px solid var(--border-primary)', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#FAFAFA'
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div style={{
                                    padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-secondary)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', flexShrink: 0
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button 
                                            onClick={() => setExpandedId(null)} 
                                            style={{ 
                                                background: '#111111', 
                                                border: 'none', 
                                                color: '#FFFFFF', 
                                                cursor: 'pointer', 
                                                padding: '8px 16px', 
                                                borderRadius: '30px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '6px', 
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'var(--font-body)'
                                            }}
                                        >
                                            <ArrowLeft size={16} /> {t('projects.back')}
                                        </button>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-display)', textTransform: 'uppercase', color: '#111111' }}>{expandedProject.title}</h3>
                                    </div>
                                    <a href={expandedProject.url} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 20px', background: 'var(--accent-blue)', borderRadius: '30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                                        Live <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div style={{ flex: 1, position: 'relative', background: '#FFFFFF' }}>
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
    <Reveal delay={idx * 0.1} direction={idx % 2 === 0 ? 'left' : 'right'}>
        <div
            onClick={onClick}
            style={{ 
                border: '1px solid var(--border-secondary)',
                borderRadius: '0px', /* Sharp corners */
                overflow: 'hidden', 
                cursor: 'pointer', 
                position: 'relative', 
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
                onHover(project.id);
                e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
            onMouseLeave={(e) => {
                onHover(null);
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
            }}
        >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
                <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: project.imagePosition || 'center',
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }} 
                />
                
                {/* Metric Badge */}
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        color: '#FFFFFF', 
                        fontWeight: 700, 
                        fontSize: '12px', 
                        backgroundColor: '#111111', 
                        padding: '6px 14px', 
                        borderRadius: '30px', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-body)'
                    }}>
                        <TrendingUp size={14} strokeWidth={2.5} /> {project.metric}
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <h3 style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem', 
                    fontWeight: 800, 
                    margin: 0, 
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)'
                }}>{project.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <ListChecks size={16} color="var(--text-secondary)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{project.problem}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <DollarSign size={16} color="var(--accent-red)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, margin: 0 }}>{project.result}</p>
                    </div>
                </div>

                <div style={{ 
                    marginTop: '10px',
                    color: 'var(--accent-blue)', 
                    fontWeight: 600, 
                    fontSize: '14px', 
                    textTransform: 'uppercase', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-body)',
                    textDecoration: isHovered ? 'underline' : 'none'
                }}>
                    {t('projects.open')} <Eye size={16} />
                </div>
            </div>
        </div>
    </Reveal>
);

export default Projects;
