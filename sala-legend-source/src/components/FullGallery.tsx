import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

// Use the same local assets as Gallery
import asset2 from '../assets/asset (2).jpeg';
import asset3 from '../assets/asset (3).jpeg';
import asset4 from '../assets/asset (4).jpeg';
import asset5 from '../assets/asset (5).jpeg';
import asset6 from '../assets/asset (6).jpeg';
import asset7 from '../assets/asset (7).jpeg';
import asset8 from '../assets/asset (8).jpeg';
import asset9 from '../assets/asset (9).jpeg';

const GALLERY_IMAGES = [
    { id: '1', image_url: asset2 },
    { id: '2', image_url: asset3 },
    { id: '3', image_url: asset4 },
    { id: '4', image_url: asset5 },
    { id: '5', image_url: asset6 },
    { id: '6', image_url: asset7 },
    { id: '7', image_url: asset8 },
    { id: '8', image_url: asset9 },
];

const FullGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = GALLERY_IMAGES;

  return (
    <div className="min-h-screen bg-[#1a1614] text-white py-12 md:py-20 px-4 relative overflow-hidden">
      <div className="noise-bg absolute inset-0 opacity-[0.2]"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <button 
                onClick={() => window.location.hash = ''} 
                className="flex items-center gap-2 text-gold hover:text-white transition-colors group font-serif tracking-widest text-sm"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                WRÓĆ DO GŁÓWNEJ STRONY
            </button>
            <h1 className="text-3xl md:text-5xl font-serif tracking-widest uppercase">ZOBACZNASZE WNĘTRZA</h1>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {images.map((img, i) => (
                <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl border border-white/5 shadow-2xl"
                    onClick={() => setSelectedImage(img.image_url)}
                >
                    <img 
                      src={img.image_url} 
                      alt={`Galeria Wnętrz ${i + 1}`} 
                      className="w-full h-auto object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 m-2 rounded-lg pointer-events-none"></div>
                </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
          {selectedImage && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                  className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              >
                  <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 md:top-8 md:right-8 z-[10001] text-white/70 hover:text-gold transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-sm shadow-xl"
                  >
                      <X className="w-8 h-8 md:w-10 md:h-10" />
                  </button>
                  <motion.img
                      initial={{ scale: 0.95, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0, y: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      src={selectedImage}
                      alt="Sala Legend - Galeria Wnętrz"
                      className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                  />
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

export default FullGallery;
