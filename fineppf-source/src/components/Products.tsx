import { motion } from 'framer-motion';
import { Shield, Sparkles, Palette, Monitor, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../constants';

const ICON_MAP = {
    Shield: <Shield className="w-5 h-5 text-primary" />,
    Sparkles: <Sparkles className="w-5 h-5 text-primary" />,
    Pallete: <Palette className="w-5 h-5 text-primary" />,
    Monitor: <Monitor className="w-5 h-5 text-primary" />,
};

export default function Products() {
    const navigate = useNavigate();

    const handleScrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('kontakt');
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="produkty" className="py-24 bg-black relative">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Nasze Kolekcje</h2>
                    <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-6 leading-[1.2]">Wybierz Swoją Folię</h3>
                    <p className="text-zinc-400 text-lg">
                        Oferujemy szeroki wachlarz zaawansowanych folii ochronnych TPU. Od krystalicznej czystości po odważne zmiany koloru – dostarczamy materiały najwyższej klasy.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    {PRODUCT_CATEGORIES.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`glass-card overflow-hidden group rounded-3xl flex flex-col sm:flex-row h-full transition-all duration-500 ${product.highlight ? 'border-primary/50 ring-1 ring-primary/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'hover:border-primary/30'
                                }`}
                        >
                            {/* Product Image */}
                            <div className="w-full sm:w-2/5 relative overflow-hidden h-48 sm:h-auto">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                            </div>

                            {/* Product Content */}
                            <div className="flex-1 p-8 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        {ICON_MAP[product.icon as keyof typeof ICON_MAP]}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-orbitron font-bold text-white mb-0.5">{product.name}</h4>
                                        <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{product.tagline}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8 flex-grow">
                                    {product.description.filter(item => item !== '+').map((item, i) => (
                                        <div key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary/60" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleScrollToContact}
                                    className="mt-auto group/btn flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors"
                                >
                                    Zapytaj o detale
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <button
                        onClick={() => navigate('/katalog')}
                        className="inline-flex items-center justify-center px-10 py-4 font-black uppercase tracking-[0.2em] font-orbitron italic bg-white text-black hover:bg-zinc-200 rounded-full transition-all hover:scale-105 shadow-xl shadow-white/10"
                    >
                        Pokaż Pełny Katalog
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
