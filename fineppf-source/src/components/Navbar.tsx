import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PHONE_NUMBER } from '../constants';
import logo from '../assets/logo.png';

interface NavbarProps {
    isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks: { name: string; id: string; isPage?: boolean; path?: string }[] = [
        { name: 'O Nas', id: 'dlaczego-my' },
        { name: 'Produkty', id: 'produkty' },
        { name: 'Katalog', id: 'katalog', isPage: true, path: '/katalog' },
        { name: 'Galeria', id: 'galeria' },
        { name: 'Kontakt', id: 'kontakt' },
    ];

    const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, id: string, isPage?: boolean, path?: string) => {
        e.preventDefault();
        setIsOpen(false);

        if (isPage) {
            navigate(path || '/blog');
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }

        const scrollToElement = () => {
            const element = document.getElementById(id);
            if (element) {
                // Get header height approx (e.g., 80px)
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };

        if (!isHome) {
            await navigate('/');
            setTimeout(scrollToElement, 100);
        } else {
            scrollToElement();
        }
    };

    const handleLogoClick = () => {
        if (!isHome) {
            navigate('/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${isScrolled || isOpen ? 'bg-black/90 backdrop-blur-md py-4 shadow-sm border-b border-zinc-900' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a
                        href="/#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogoClick();
                        }}
                        className="flex items-center gap-2 cursor-pointer relative z-[61]"
                    >
                        <img src={logo} alt="FinePPF Logo" className="h-12 md:h-16 w-auto" />
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.isPage ? link.path : `/#${link.id}`}
                                onClick={(e) => handleNavigation(e, link.id, link.isPage, link.path)}
                                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors font-orbitron relative group cursor-pointer"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-xs font-black transition-all transform hover:scale-105 font-orbitron uppercase shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        >
                            <Phone size={14} />
                            {PHONE_NUMBER}
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white p-2 z-[61] relative"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} className="text-primary" /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-0 bg-black z-[55] transition-all duration-500 ease-in-out flex flex-col ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'}`}>
                <div className="flex flex-col flex-grow items-center justify-center p-8 pt-24 space-y-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.isPage ? link.path : `/#${link.id}`}
                            onClick={(e) => handleNavigation(e, link.id, link.isPage, link.path)}
                            className="text-4xl font-black text-white hover:text-primary transition-colors font-orbitron italic uppercase tracking-wider relative cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="pt-6 w-full max-w-xs">
                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className="flex items-center justify-center gap-4 bg-primary text-white py-5 rounded-2xl text-xl font-black font-orbitron uppercase italic shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-full"
                        >
                            <Phone size={24} />
                            Zadzwoń
                        </a>
                    </div>
                </div>

                <div className="pb-12 text-center w-full px-8">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-orbitron">Premium Care Studio</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;
