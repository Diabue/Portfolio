import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import photo1 from '../assets/photo1.PNG';
import photo2 from '../assets/photo2.PNG';
import photo3 from '../assets/photo3.PNG';
import ppf_application from '../assets/ppf_application.png';
import matte_detailing from '../assets/matte_detailing.png';
import ppf_cutting from '../assets/ppf_cutting.png';

const galleryPhotos = [
    photo1,
    ppf_application,
    photo2,
    matte_detailing,
    photo3,
    ppf_cutting
];

export default function Gallery() {
    return (
        <section id="galeria" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Camera className="w-5 h-5 text-primary" />
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Portfolio</h2>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-6 leading-[1.2]">Nasze Realizacje</h3>
                    <p className="text-gray-600 text-lg">
                        Zobacz jak na żywo wygląda perfekcyjnie aplikowana folia PPF.
                        Wybór naszych najlepszych prac z dbałością o każdy milimetr lakieru.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {galleryPhotos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-square overflow-hidden rounded-3xl bg-gray-50 shadow-sm border border-gray-200 cursor-pointer"
                        >
                            <img
                                src={photo}
                                alt={`Realizacja ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Overlay na hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 ease-in-out"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out hidden sm:block"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://www.instagram.com/fineppf/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-medium hover:bg-gray-50 transition-all font-orbitron uppercase tracking-wider text-sm shadow-sm hover:scale-105"
                    >
                        Więcej na Instagramie
                    </a>
                </div>
            </div>
        </section>
    );
}
