
import React from 'react';
import { PACKAGES } from '../constants';

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];

const Packages: React.FC = () => {
  return (
    <section id="oferta" className="py-24 bg-zinc-950 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div id="cennik" className="text-center mb-20 scroll-mt-24">
          <h2 className="text-yellow-400 text-sm font-black uppercase tracking-[0.5em] mb-4 font-orbitron italic">Cennik</h2>
          <h3 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase italic font-orbitron">Pakiety Usług</h3>
          <div className="w-24 h-2 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {PACKAGES.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group flex flex-col p-8 transition-all duration-500 border-l-4 ${pkg.highlight ? 'bg-yellow-500/10 border-yellow-500' : 'bg-white/[0.02] border-zinc-800 hover:border-yellow-400/50 hover:bg-white/[0.04]'}`}
            >
              {/* Header with Line */}
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-zinc-500 text-lg font-black font-orbitron italic">{romanNumerals[index]}</span>
                  <h4 className="text-2xl md:text-3xl font-black text-yellow-400 font-orbitron italic tracking-tight uppercase">
                    {pkg.name}
                  </h4>
                </div>
                <div className="hidden md:block flex-grow border-b-2 border-yellow-400/20 mb-2"></div>
                <div className="text-white text-2xl md:text-3xl font-black font-orbitron shrink-0 italic">
                  {pkg.price}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 flex-grow">
                {pkg.description.map((line, i) => (
                  <p
                    key={i}
                    className={`text-[12px] md:text-sm font-bold uppercase tracking-[0.05em] ${line === '+' ? 'text-yellow-500/60 py-1' : 'text-zinc-300'}`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Action Button - ALWAYS VISIBLE */}
              <div className="mt-10">
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 text-xs font-black uppercase tracking-[0.2em] font-orbitron italic border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  Wybierz ten pakiet
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[1em] font-black font-orbitron italic">W&A DETAILING PREMIUM STUDIO</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
