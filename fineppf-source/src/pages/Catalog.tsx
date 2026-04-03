import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Palette, Monitor, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../constants';

const ICON_MAP = {
    Shield: <Shield className="w-8 h-8 text-primary" />,
    Sparkles: <Sparkles className="w-8 h-8 text-primary" />,
    Pallete: <Palette className="w-8 h-8 text-primary" />,
    Monitor: <Monitor className="w-8 h-8 text-primary" />,
};

const Catalog: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Powrót do strony głównej
                    </button>

                    <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6">Pełny Katalog <span className="text-primary">PPF</span></h1>
                    <p className="text-zinc-400 text-xl max-w-3xl">
                        Odkryj pełną gamę naszych rozwiązań ochronnych. Od klasycznych folii bezbarwnych po zaawansowane serie kolorystyczne i efekty specjalne.
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="space-y-32">
                    {PRODUCT_CATEGORIES.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                        >
                            {/* Image side */}
                            <div className="flex-1 w-full">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-zinc-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="flex-1 space-y-8">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    {ICON_MAP[product.icon as keyof typeof ICON_MAP]}
                                </div>

                                <div>
                                    <h2 className="text-4xl font-orbitron font-bold mb-2">{product.name}</h2>
                                    <p className="text-primary font-bold uppercase tracking-widest text-sm">{product.tagline}</p>
                                </div>

                                <div className="space-y-4">
                                    {product.description.filter(item => item !== '+').map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-zinc-300">
                                            <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    Nasza seria {product.name} została zaprojektowana z myślą o najbardziej wymagających użytkownikach.
                                    Łączy w sobie bezkonkurencyjną ochronę mechaniczną z perfekcyjną estetyką,
                                    zapewniając nienaganny wygląd Twojego pojazdu przez długie lata.
                                </p>

                                <button
                                    onClick={() => {
                                        navigate('/#kontakt');
                                        setTimeout(() => {
                                            const element = document.getElementById('kontakt');
                                            if (element) {
                                                const headerOffset = 80;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                            }
                                        }, 100);
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all hover:scale-105"
                                >
                                    Zapytaj o ten produkt
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
