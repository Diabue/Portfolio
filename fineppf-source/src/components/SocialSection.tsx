import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import photo1 from '../assets/photo1.PNG';
import photo2 from '../assets/photo2.PNG';
import photo3 from '../assets/photo3.PNG';
import ppf_application from '../assets/ppf_application.png';

const SocialSection: React.FC = () => {
    const instagramUrl = "https://www.instagram.com/fineppf/";
    const facebookUrl = "https://www.facebook.com/fineppf/"; // Fixed URL template

    return (
        <section id="social" className="py-24 bg-zinc-950 border-y border-zinc-900 relative scroll-mt-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        <h2 className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4">Social Media</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.15] font-orbitron italic">
                            Widzisz nas <br className="hidden sm:block" />w akcji?
                        </h3>
                        <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Nie tylko czytaj o nas – zobacz jak pracujemy. Na naszych profilach znajdziesz codzienną dawkę precyzji, doskonałości i pasji do perfekcyjnej ochrony lakieru.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <div className="relative group/trigger">
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-8 py-5 rounded-2xl font-black text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-primary/30 overflow-hidden font-orbitron uppercase italic"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover/trigger:opacity-100 transition-opacity duration-500"></div>
                                    <Instagram size={24} className="text-primary transition-transform duration-500 group-hover/trigger:scale-125 group-hover/trigger:rotate-12" />
                                    <span className="relative z-10">@fineppf</span>
                                </a>
                            </div>

                            <div className="relative group/fb-trigger">
                                <a
                                    href={facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-8 py-5 rounded-2xl font-black text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 overflow-hidden font-orbitron uppercase italic"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover/fb-trigger:opacity-100 transition-opacity duration-500"></div>
                                    <Facebook size={24} className="text-blue-600 transition-transform duration-500 group-hover/fb-trigger:scale-125 group-hover/fb-trigger:-rotate-12" />
                                    <span className="relative z-10">Facebook</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual Accent - Instagram Grid Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4 pt-12">
                            <div className="h-64 rounded-3xl overflow-hidden border border-zinc-800 group/img1 relative">
                                <img src={photo1} className="w-full h-full object-cover transition-transform duration-700 group-hover/img1:scale-110" alt="Insta 1" />
                                <div className="absolute inset-0 bg-black/20 group-hover/img1:bg-black/0 transition-colors"></div>
                                <Instagram className="absolute top-4 right-4 text-white/50 w-5 h-5 pointer-events-none" />
                            </div>
                            <div className="h-48 rounded-3xl overflow-hidden border border-zinc-800 group/img2 relative">
                                <img src={ppf_application} className="w-full h-full object-cover transition-transform duration-700 group-hover/img2:scale-110" alt="Insta 2" />
                                <div className="absolute inset-0 bg-black/20 group-hover/img2:bg-black/0 transition-colors"></div>
                                <Instagram className="absolute top-4 right-4 text-white/50 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 rounded-3xl overflow-hidden border border-zinc-800 group/img3 relative">
                                <img src={photo2} className="w-full h-full object-cover transition-transform duration-700 group-hover/img3:scale-110" alt="Insta 3" />
                                <div className="absolute inset-0 bg-black/20 group-hover/img3:bg-black/0 transition-colors"></div>
                                <Instagram className="absolute top-4 right-4 text-white/50 w-5 h-5 pointer-events-none" />
                            </div>
                            <div className="h-64 rounded-3xl overflow-hidden border border-zinc-800 group/img4 relative">
                                <img src={photo3} className="w-full h-full object-cover transition-transform duration-700 group-hover/img4:scale-110" alt="Insta 4" />
                                <div className="absolute inset-0 bg-black/20 group-hover/img4:bg-black/0 transition-colors"></div>
                                <Instagram className="absolute top-4 right-4 text-white/50 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SocialSection;
