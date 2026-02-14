import { Mail, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import myPhoto from '../assets/fot.jpg';
import { Reveal } from './Reveal';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="section hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
                animation: 'float 10s infinite ease-in-out'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
                animation: 'float 15s infinite ease-in-out reverse'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2.5rem'
                }}>
                    {/* Profile Image with Glow */}
                    <Reveal>
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid var(--accent-color)',
                            boxShadow: 'var(--accent-glow)',
                            position: 'relative'
                        }}>
                            <img
                                src={myPhoto}
                                alt="Max"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </Reveal>

                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            marginBottom: '1rem',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1
                        }}>
                            {t('hero.greeting')} <span style={{
                                background: 'linear-gradient(to right, #a78bfa, #3b82f6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Max</span>
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontWeight: 300
                        }}>
                            {t('hero.role')}
                        </p>
                    </div>

                    <Reveal delay={0.4}>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                            {[
                                { icon: Github, href: "https://github.com/Diabue" },
                                { icon: Linkedin, href: "#" },
                                { icon: Mail, href: "mailto:maksymilian.kasprowicz@gmail.com" }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        background: 'var(--surface-color)',
                                        border: '1px solid var(--border-color)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = 'var(--accent-glow)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <item.icon size={28} />
                                </a>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>

            <style>
                {`
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -20px); }
                    100% { transform: translate(0, 0); }
                }
                `}
            </style>
        </section >
    );
};

export default Hero;
