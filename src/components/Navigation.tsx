import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Navigation = () => {
    const { t, i18n } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 960px)');
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'pl' ? 'en' : 'pl';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { label: t('nav.home', 'Start'), href: '#home' },
        { label: t('nav.services', 'Oferta'), href: '#services' },
        { label: t('nav.whyme', 'Dlaczego my'), href: '#whyme' },
        { label: t('nav.projects', 'Projekty'), href: '#projects' },
        { label: t('nav.pricing', 'Cennik'), href: '#pricing' },
        { label: t('nav.process', 'Proces'), href: '#process' },
        { label: t('nav.social', 'Opinie'), href: '#social' },
        { label: t('nav.contact', 'Kontakt'), href: '#contact' },
    ];

    const handleLinkClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1500,
            backgroundColor: '#FFFFFF',
            borderBottom: scrolled ? '1px solid var(--border-secondary)' : '1px solid transparent',
            transition: 'border-color 0.2s ease',
        }}>
            {/* Top Promotional Banner */}
            <div style={{
                backgroundColor: 'var(--bg-dark-section)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '8px 16px',
                letterSpacing: '0.1em',
            }}>
                {t('promo.banner', 'DARMOWA WYCENA • USŁUGI DLA LOKALNYCH FIRM • REALNY WZROST SPRZEDAŻY')}
            </div>

            {/* Main Nav Container */}
            <div className="container" style={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }} style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    MKSITES<span style={{ color: 'var(--accent-red)' }}>.</span>
                </a>

                {/* Desktop Nav Links */}
                {!isMobile && (
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    color: 'var(--text-primary)',
                                    textTransform: 'none',
                                    transition: 'color 0.15s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                )}

                {/* Right Side Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '14px',
                        }}
                    >
                        <Globe size={16} />
                        <span>{i18n.language === 'pl' ? 'EN' : 'PL'}</span>
                    </button>

                    {/* Contact Button */}
                    {!isMobile && (
                        <a
                            href="tel:+48795052809"
                            style={{
                                backgroundColor: 'var(--accent-red)',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '8px 18px',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 500,
                                fontSize: '14px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--text-secondary)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-red)'}
                        >
                            <Phone size={14} /> 795 052 809
                        </a>
                    )}

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                            }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobile && isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid var(--border-secondary)',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '18px',
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                                textTransform: 'none',
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="tel:+48795052809"
                        style={{
                            backgroundColor: 'var(--accent-red)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '30px',
                            padding: '12px 24px',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '16px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        <Phone size={18} /> 795 052 809
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navigation;
