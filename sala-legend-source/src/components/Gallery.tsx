import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Motorbike, X } from 'lucide-react';

// Placeholder/Fallback assets
import asset2 from '../assets/asset (2).jpeg';
import asset3 from '../assets/asset (3).jpeg';
import asset4 from '../assets/asset (4).jpeg';
import asset5 from '../assets/asset (5).jpeg';
import asset6 from '../assets/asset (6).jpeg';
import asset7 from '../assets/asset (7).jpeg';
import asset8 from '../assets/asset (8).jpeg';
import asset9 from '../assets/asset (9).jpeg';

interface GalleryImage {
    sourceUrl: string;
    altText: string;
}

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const upperHall = [
        { sourceUrl: asset2, altText: "Sala Legend" },
        { sourceUrl: asset3, altText: "Sala Legend" },
        { sourceUrl: asset4, altText: "Sala Legend" },
        { sourceUrl: asset5, altText: "Sala Legend" }
    ];

    const lowerHall = [
        { sourceUrl: asset6, altText: "Sala Legend" },
        { sourceUrl: asset7, altText: "Sala Legend" },
        { sourceUrl: asset8, altText: "Sala Legend" },
        { sourceUrl: asset9, altText: "Sala Legend" }
    ];

    const renderImageGrid = (images: GalleryImage[], delayOffset: number) => (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {images.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index % 4) * 0.1 + delayOffset }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden group cursor-pointer rounded-xl"
                    onClick={() => setSelectedImage(img.sourceUrl)}
                >
                    <img
                        src={img.sourceUrl}
                        alt={img.altText || "Sala Legend - Ekskluzywne wnętrza bankietowe w Puszczykowie"}
                        className="w-full h-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 m-2 rounded-lg"></div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <section id="galeria" className="py-24 bg-[#1a1614] text-white relative border-t border-gold/10 overflow-hidden">
            <div className="noise-bg absolute inset-0 opacity-[0.2]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-widest mb-4 uppercase">ZOBACZ NASZE SALE</h2>
                    <div className="w-20 h-px bg-gold mx-auto"></div>
                </div>

                {/* Upper Hall */}
                <div className="space-y-8 mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-gold font-serif italic text-xl tracking-wider">GÓRNA SALA</span>
                        <div className="flex-grow h-px bg-gold/20"></div>
                    </div>
                    {renderImageGrid(upperHall, 0)}
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-12 my-12 py-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-full border border-gold/30 rotate-[-15deg]"
                    >
                        <Motorbike className="w-8 h-8 text-gold stroke-[1px]" />
                    </motion.div>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-full border border-gold/30 rotate-[15deg]"
                    >
                        <Motorbike className="w-8 h-8 text-gold stroke-[1px]" />
                    </motion.div>
                </div>

                {/* Lower Hall */}
                <div className="space-y-8 mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-grow h-px bg-gold/20"></div>
                        <span className="text-gold font-serif italic text-xl tracking-wider uppercase">DOLNA SALA</span>
                    </div>
                    {renderImageGrid(lowerHall, 0.2)}
                </div>

                <div className="text-center pt-8">
                    <a
                        href="#galeria-pelna"
                        className="inline-block bg-gold hover:bg-[#b08d4a] text-white px-12 py-4 font-serif tracking-widest transition-all duration-300 rounded-full shadow-lg transform hover:scale-105"
                    >
                        ZOBACZ NASZĄ GALERIĘ
                    </a>
                </div>
            </div>

            {/* Lightbox Modal */}
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
                            alt="Sala Legend - Galeria Wnętrz Powiększenie"
                            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
