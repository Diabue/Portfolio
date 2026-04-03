import { motion } from 'framer-motion';
import heroPlaceholder from '../assets/asset (2).jpeg';
const Hero = ({ hasEvents }: { hasEvents: boolean }) => {
    // Static content
    const content = {
        heroTitle: "SALA LEGEND",
        heroSubtitle: "Eleganckie przyjęcia z charakterem",
        heroDescription: "Wyjątkowa przestrzeń eventowa w samym sercu Muzeum Polskiej Motoryzacji - idealna na imprezy rodzinne, jubileusze oraz firmowe eventy.",
        heroImage: { node: { sourceUrl: heroPlaceholder, altText: "Wnętrze luksusowej Sali Legend" } }
    };

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                    backgroundImage: `url("${content.heroImage.node.sourceUrl}")`,
                }}
                role="img"
                aria-label={content.heroImage.node.altText}
            >
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/60 to-transparent"></div>
            </div>

            {/* Noise Texture */}
            <div className="noise-bg absolute inset-0 opacity-[0.15]"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif tracking-widest mb-4">
                        {content.heroTitle}
                    </h1>
                    <p className="text-gold italic font-serif text-xl md:text-2xl mb-8 tracking-wide">
                        {content.heroSubtitle}
                    </p>
                    <div className="w-24 h-px bg-gold/50 mx-auto mb-8"></div>
                    <p className="text-gray-200 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-10 font-sans font-light">
                        {content.heroDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto bg-gold hover:bg-[#b08d4a] text-white px-10 py-4 font-serif tracking-widest transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            ZAPYTAJ O TERMIN
                        </button>
                        {hasEvents && (
                            <button
                                onClick={() => document.getElementById('aktualnosci')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 font-serif tracking-widest transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                            >
                                AKTUALNOŚCI
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-16 bg-gold/30"></div>
            </div>
        </section>
    );
};

export default Hero;
