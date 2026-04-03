import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-black border-t border-zinc-900 py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 md:gap-4">

                    {/* Lewa strona: Logo i Copyright */}
                    <div className="flex flex-col items-center md:items-start order-2 md:order-1">
                        <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src={logo} alt="FinePPF Logo" className="h-24 w-auto brightness-0 invert" />
                        </div>
                        <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-tight text-center md:text-left mb-4">
                            © {new Date().getFullYear()} FinePPF. Wszystkie prawa zastrzeżone.
                        </p>
                    </div>

                    {/* Środek: Social Media */}
                    <div className="flex justify-center items-center space-x-6 order-1 md:order-2">
                        <a
                            href="https://www.instagram.com/fineppf/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900 p-5 rounded-full text-zinc-400 hover:text-primary transition-all duration-300 border border-zinc-800 hover:border-primary/50 hover:scale-110 shadow-sm"
                            aria-label="Instagram"
                        >
                            <Instagram size={24} />
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900 p-5 rounded-full text-zinc-400 hover:text-blue-600 transition-all duration-300 border border-zinc-800 hover:border-blue-600/50 hover:scale-110 shadow-sm"
                            aria-label="Facebook"
                        >
                            <Facebook size={24} />
                        </a>
                    </div>

                    {/* Prawa strona: Realizacja */}
                    <div className="flex flex-col items-center md:items-end order-3 gap-2">
                        <div className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-black font-orbitron">
                            Design & Development
                        </div>
                        <div className="text-zinc-300 italic font-black font-orbitron text-[11px] uppercase tracking-wider">
                            ITCS SP. Z O.O.
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
