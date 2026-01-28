
import React from 'react';
import { GALLERY_IMAGES } from '../constants';
import { Eye } from 'lucide-react';

const Gallery: React.FC = () => {
  return (
    <section id="galeria" className="py-24 bg-zinc-900/50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-yellow-400 text-sm font-black uppercase tracking-[0.3em] mb-4 text-center md:text-left">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white text-center md:text-left">Nasze Realizacje</h3>
          </div>
          <p className="text-zinc-500 max-w-md text-center md:text-right">
            Zobacz jak zmieniamy samochody naszych klientów. Każdy detal ma znaczenie, każda powierzchnia zasługuje na perfekcję.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div 
              key={img.id} 
              className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-yellow-500 p-3 rounded-full inline-block mb-3">
                    <Eye size={24} className="text-black" />
                  </div>
                  <p className="text-white font-bold uppercase tracking-widest text-sm">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://www.instagram.com/wnadetailing/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent hover:bg-white/5 border-2 border-zinc-700 hover:border-yellow-400 px-10 py-4 rounded-full text-white font-bold transition-all inline-flex items-center gap-2"
          >
            Zobacz więcej na Instagramie
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
