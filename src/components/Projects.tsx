import { useState } from 'react';
import { X, ExternalLink, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import project1Img from '../assets/project1.png';
import dashboardImg from '../assets/dashboard.png';
import project3Img from '../assets/project3.png';

const Projects = () => {
    const { t } = useTranslation();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: t('projects.p1_title'),
            description: t('projects.p1_desc'),
            url: "/w-a/index.html",
            color: "#3b82f6",
            image: project1Img
        },
        {
            id: 2,
            title: "Admin Dashboard",
            description: t('projects.p2_desc'),
            url: "/dashboard-app/index.html",
            color: "#10b981",
            image: dashboardImg
        },
        {
            id: 3,
            title: t('projects.p3_title'),
            description: t('projects.p3_desc'),
            url: "/crm-dashboard/index.html",
            color: "#8b5cf6",
            image: project3Img
        }
    ];

    return (
        <section className="section projects" id="projects" style={{ padding: '4rem 0' }}>
            <div className="container">
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    fontSize: 'clamp(2rem, 4vw, 3rem)'
                }}>
                    {t('projects.title')} <span style={{
                        background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>{t('projects.title_accent')}</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project) => (
                        <motion.div
                            layoutId={`project-${project.id}`}
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                backgroundColor: 'var(--surface-color)',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            className="project-card"
                            onClick={() => setExpandedId(project.id)}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                layoutId={`image-container-${project.id}`}
                                style={{
                                    height: '200px',
                                    background: project.image
                                        ? `url(${project.image}) center/cover no-repeat`
                                        : `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {!project.image && <Maximize2 size={40} color={project.color} style={{ opacity: 0.7 }} />}
                            </motion.div>
                            <motion.div
                                layoutId={`content-${project.id}`}
                                style={{ padding: '1.5rem' }}
                            >
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{project.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expanded Overlay */}
            <AnimatePresence>
                {expandedId && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem'
                    }} onClick={() => setExpandedId(null)}>

                        <motion.div
                            layoutId={`project-${expandedId}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '1200px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '1rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >

                            {/* Header */}
                            <motion.div
                                layoutId={`header-${expandedId}`}
                                style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#1e1b4b' // Darker indigo for header
                                }}
                            >
                                <h3 style={{ margin: 0 }}>
                                    {projects.find(p => p.id === expandedId)?.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a
                                        href={projects.find(p => p.id === expandedId)?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--text-secondary, #aaa)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {t('projects.open')} <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => setExpandedId(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            padding: '0.25rem'
                                        }}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Content / Iframe */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                style={{ flex: 1, position: 'relative', background: '#fff' }}
                            >
                                <iframe
                                    src={projects.find(p => p.id === expandedId)?.url}
                                    title="Project Preview"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
