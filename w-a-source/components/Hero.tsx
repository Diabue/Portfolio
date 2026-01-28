import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

import heroImage from '../assets/hero.png';

const Hero: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          className="w-full h-full object-cover"
          alt="Premium car detailing workshop"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-48 pb-20 md:pt-40 lg:pt-32">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-yellow-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap font-orbitron italic">Najlepszy detailing w regionie</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.9] mb-10 font-orbitron italic uppercase tracking-tighter">
            W&A <span className="text-yellow-400">DETAILING</span> <br />
            <span className="text-zinc-200">PREMIUM CARE.</span>
          </h1>

          <p className="text-base md:text-xl text-zinc-400 mb-12 max-w-2xl font-black leading-relaxed uppercase tracking-tight font-orbitron italic">
            Twoje auto zasługuje na to co najlepsze. Specjalizujemy się w powłokach ceramicznych, elastomerowych oraz zaawansowanej korekcie lakieru.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-full text-lg font-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.3)] group font-orbitron uppercase italic"
            >
              <Phone size={22} className="group-hover:animate-bounce" />
              Zadzwoń teraz
            </a>
            <a
              href="#kontakt"
              onClick={scrollToContact}
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-5 rounded-full text-lg font-black transition-all font-orbitron uppercase italic"
            >
              <Calendar size={22} />
              Umów wizytę
            </a>
          </div>

          <div className="mt-20 md:mt-24 flex items-center gap-10 border-l-4 border-yellow-400/30 pl-8 font-orbitron italic">
            <div>
              <div className="text-2xl md:text-5xl font-black text-white italic">500+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black mt-2">Realizacji</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-black text-white italic">100%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black mt-2">Precyzji</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
