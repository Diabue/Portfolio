import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

import socialImg1 from '../assets/g5.png';
import socialImg2 from '../assets/g6.png';

const SocialSection: React.FC = () => {
  const instagramUrl = "https://www.instagram.com/wnadetailing/";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61577889958804";

  return (
    <section id="social" className="py-24 bg-zinc-950 border-y border-zinc-900 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-yellow-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Social Media</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-orbitron italic">
              Widzisz nas <br />w akcji?
            </h3>
            <p className="text-zinc-500 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Nie tylko czytaj o nas – zobacz jak pracujemy. Na naszych profilach znajdziesz codzienną dawkę luksusu, precyzji i pasji do motoryzacji.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <div className="relative group/trigger">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-2xl font-black text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(250,204,21,0.2)] hover:border-yellow-400/30 overflow-hidden font-orbitron uppercase italic"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/0 via-yellow-400/0 to-yellow-400/10 opacity-0 group-hover/trigger:opacity-100 transition-opacity duration-500"></div>
                  <Instagram size={24} className="text-yellow-400 transition-transform duration-500 group-hover/trigger:scale-125 group-hover/trigger:rotate-12" />
                  <span className="relative z-10">@wnadetailing</span>
                </a>
              </div>

              <div className="relative group/fb-trigger">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-2xl font-black text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 overflow-hidden font-orbitron uppercase italic"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover/fb-trigger:opacity-100 transition-opacity duration-500"></div>
                  <Facebook size={24} className="text-blue-500 transition-transform duration-500 group-hover/fb-trigger:scale-125 group-hover/fb-trigger:-rotate-12" />
                  <span className="relative z-10">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Visual Accent */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="h-64 rounded-3xl overflow-hidden border border-white/10 group/img1">
                <img src={socialImg1} className="w-full h-full object-cover grayscale group-hover/img1:grayscale-0 group-hover/img1:scale-105 transition-all duration-700" alt="Work" />
              </div>
              <div className="h-48 rounded-3xl overflow-hidden border border-white/10 bg-yellow-500/10 flex items-center justify-center p-8">
                <Instagram size={48} className="text-yellow-400 opacity-20 animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 flex flex-col justify-end p-6 group/stat">
                <p className="text-yellow-400 font-black text-4xl group-hover/stat:scale-110 transition-transform origin-left font-orbitron italic">99%</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold font-orbitron">Pozytywnych opinii</p>
              </div>
              <div className="h-64 rounded-3xl overflow-hidden border border-white/10 group/img2">
                <img src={socialImg2} className="w-full h-full object-cover grayscale group-hover/img2:grayscale-0 group-hover/img2:scale-105 transition-all duration-700" alt="Detailing" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialSection;
