import { motion } from 'framer-motion';
import { Compass, Utensils, Car, Sofa } from 'lucide-react';

const WhyUs = () => {
    const features = [
        {
            icon: Compass,
            title: "Wyjątkowa atmosfera",
            description: "Stylowe obiady weselne w wyjątkowym otoczeniu legendarnych pojazdów"
        },
        {
            icon: Utensils,
            title: "Eleganckie przyjęcia",
            description: "Wyjątkowe przyjęcia jubileuszowe dla Twoich bliskich"
        },
        {
            icon: Car,
            title: "Historia i styl",
            description: "Prestiżowe gale, bankiety i uroczystości firmowe w klimacie retro"
        },
        {
            icon: Sofa,
            title: "Komfortowa przestrzeń",
            description: "Dostosowujemy salę do potrzeb każdego wydarzenia"
        }
    ];
    return (
        <section id="dlaczego-my" className="py-24 bg-[#1a1614] text-white relative">
            <div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10"
            ></div>
            <div className="noise-bg absolute inset-0 opacity-[0.2]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif tracking-wider mb-4">CO NAS WYRÓŻNIA?</h2>
                    <div className="w-20 h-px bg-gold mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="mb-6 p-4 rounded-full border border-gold/30">
                                <item.icon className="w-10 h-10 text-gold stroke-[1px]" />
                            </div>
                            <h3 className="text-xl font-serif mb-4 text-gold/90">{item.title}</h3>
                            <p className="text-gray-400 font-sans text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gold hover:bg-[#b08d4a] text-white px-10 py-3 font-serif tracking-widest transition-all duration-300 shadow-lg"
                    >
                        DOWIEDZ SIĘ WIĘCEJ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
