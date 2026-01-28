import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PHONE_NUMBER } from '../constants';

interface NavbarProps {
  isScrolled: boolean;
}

// Placeholder logo for W&A Detailing (Yellow text on transparent/dark background)
import logo from '../assets/logo.png';

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

  const navLinks = [
    { name: 'Social', id: 'social' },
    { name: 'Cennik', id: 'cennik' },
    { name: 'Blog', id: 'blog', isPage: true }, // Mark as external page
    { name: 'Galeria', id: 'galeria' },
    { name: 'Kontakt', id: 'kontakt' },
  ];

  const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, id: string, isPage?: boolean) => {
    e.preventDefault();
    setIsOpen(false);

    if (isPage) {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (!isHome) {
      await navigate('/');
      // Add small delay to ensure page load before scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md py-4 shadow-2xl border-b border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={handleLogoClick}>
            <div className="relative h-10 md:h-12 transition-transform group-hover:scale-110">
              <img src={logo} alt="W&A Detailing Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl md:text-2xl font-black text-white leading-none font-orbitron italic uppercase tracking-tighter">W&A <span className="text-yellow-400">DETAILING</span></span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 mt-1 font-orbitron">Premium Car Care</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.isPage ? '/blog' : `/#${link.id}`}
                onClick={(e) => handleNavigation(e, link.id, link.isPage)}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-400 transition-colors font-orbitron relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full text-xs font-black transition-all transform hover:scale-105 font-orbitron uppercase shadow-[0_0_20px_rgba(250,204,21,0.2)]"
            >
              <Phone size={14} />
              {PHONE_NUMBER}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-zinc-100 p-2 z-[60] relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} className="text-yellow-400" /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-zinc-950 z-[55] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-20px]'}`}>
        <div className="flex flex-col h-full justify-center items-center p-8 space-y-10">
          <div className="flex flex-col items-center mb-10">
            <div className="mb-6 h-20">
              <img src={logo} alt="W&A Detailing Logo" className="h-full w-auto object-contain" />
            </div>
            <span className="text-3xl font-black text-white font-orbitron italic uppercase text-center">W&A <span className="text-yellow-400">DETAILING</span></span>
          </div>

          <div className="flex flex-col items-center space-y-8 w-full">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.isPage ? '/blog' : `/#${link.id}`}
                onClick={(e) => handleNavigation(e, link.id, link.isPage)}
                className="text-3xl font-black text-zinc-200 hover:text-yellow-400 transition-colors font-orbitron italic uppercase tracking-wider relative cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-10 w-full max-w-xs">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-4 bg-yellow-500 text-black py-5 rounded-2xl text-xl font-black font-orbitron uppercase italic shadow-[0_10px_30px_rgba(250,204,21,0.3)]"
            >
              <Phone size={24} />
              Zadzwoń
            </a>
          </div>

          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-orbitron mt-auto">Premium Care Studio</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
