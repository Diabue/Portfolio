import { motion } from 'framer-motion';
import { ShieldCheck, Star, Phone } from 'lucide-react';
import photo1 from '../assets/photo1.PNG';
import matte_detailing from '../assets/matte_detailing.png';

export default function Hero() {
    return (
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black pt-32 md:pt-40">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-zinc-950 z-10" />
                <img
                    src={matte_detailing}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay grayscale"
                    alt="Background detail"
                />
                {/* Opcjonalne wideo tło, dla zachowania ciemnego motywu tło css również zmienione */}
                {/* Original subtle background elements removed/replaced for dark theme */}
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/50 border border-zinc-800 shadow-sm mb-8">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 leading-normal font-orbitron">Dystrybucja Premium By FinePPF</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white leading-[1.1] mb-6 tracking-tight">
                            Zaawansowana <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">Technologia</span> Ochrony
                        </h1>

                        <p className="text-base md:text-xl text-zinc-400 mb-10 leading-relaxed font-light">
                            Dostarczamy najwyższej klasy folie PPF dla profesjonalistów i pasjonatów.
                            Innowacyjne rozwiązania, które definiują przyszłość ochrony lakieru.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/#produkty"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('produkty');
                                    if (element) {
                                        const headerOffset = 80;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                Zobacz Produkty
                            </a>
                            <a
                                href="/#kontakt"
                                onClick={(e) => {
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
                                }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full font-medium hover:bg-zinc-800 transition-all"
                            >
                                <Phone size={18} />
                                Kontakt B2B
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span>Samoregeneracja</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span>Gwarancja 10 lat</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image / Graphic Abstract */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative w-full h-[300px] md:h-[500px]"
                    >
                        <div className="absolute inset-0 bg-transparent rounded-3xl overflow-hidden flex items-center justify-center">
                            <img src={photo1} alt="Ochrona lakieru PPF" className="w-full h-full object-cover object-center rounded-3xl" />
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-semibold uppercase">Ochrona</div>
                                <div className="font-orbitron font-bold text-lg">100%</div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
