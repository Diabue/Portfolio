import { Mail, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import myPhoto from '../assets/fot.jpg';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="section hero">
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2rem'
                }}>
                    {/* Profile Image */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid var(--accent-color)',
                        boxShadow: '0 0 20px rgba(100, 108, 255, 0.3)'
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

                    <div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {t('hero.greeting')} <span style={{ color: 'var(--accent-color)' }}>Max</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            {t('hero.role')}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Social Links Placeholders */}
                        <a href="https://github.com/Diabue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', background: 'var(--surface-color)' }}>
                            <Github size={24} />
                        </a>
                        <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', background: 'var(--surface-color)' }}>
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:maksymilian.kasprowicz@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', background: 'var(--surface-color)' }}>
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
