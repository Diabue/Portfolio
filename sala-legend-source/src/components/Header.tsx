import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo-sala.png';

const navLinks = [
    { name: 'OFERTA', href: '#oferta' },
    { name: 'CO NAS WYRÓŻNIA?', href: '#dlaczego-my' },
    { name: 'ZOBACZ NASZE SALE', href: '#galeria' },
    { name: 'AKTUALNOŚCI', href: '#aktualnosci', conditional: true },
    { name: 'KONTAKT', href: '#kontakt' },
];

const Header = ({ hasEvents }: { hasEvents: boolean }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const filteredLinks = navLinks.filter(link => !link.conditional || hasEvents);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed w-full z-[1000] transition-all duration-500 ${isScrolled ? 'bg-black/90 py-4 shadow-2xl backdrop-blur-md' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img
                        src={logoImg}
                        alt="Sala Legend Logo"
                        className={`${isScrolled ? 'h-12 md:h-16 lg:h-20' : 'h-20 md:h-28 lg:h-36'} w-auto object-contain transition-all duration-500`}
                    />
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                    {filteredLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-white/80 hover:text-gold transition-colors font-serif tracking-widest text-xs xl:text-sm whitespace-nowrap"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        className="border border-gold text-gold hover:bg-gold hover:text-white px-4 xl:px-6 py-2 transition-all duration-300 font-serif text-xs tracking-[0.2em] whitespace-nowrap"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        REZERWACJA
                    </button>
                </div>

                {/* Mobile/Tablet Toggle */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black text-white absolute top-full left-0 w-full overflow-hidden border-t border-gold/10"
                    >
                        <div className="flex flex-col p-8 gap-6 text-center">
                            {filteredLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-lg font-serif tracking-widest hover:text-gold"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
