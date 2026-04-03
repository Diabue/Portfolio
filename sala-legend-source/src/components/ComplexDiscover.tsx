import { motion } from 'framer-motion';
import { Motorbike, Trophy, ArrowUpRight } from 'lucide-react';

const spaces = [
    {
        title: "MUZEUM MOTORYZACJI",
        description: "Poznaj historię polskiej myśli technicznej. Wyjątkowa kolekcja polskich motocykli i samochodów w niesamowitej aranżacji.",
        icon: Motorbike,
        link: "https://www.facebook.com/MuzeumPolskiejMotoryzacjiwPuszczykowie",
        color: "from-gold/20 to-transparent"
    },
    {
        title: "GOLF KLUB",
        description: "Profesjonalne symulatory golfowe, które pozwolą Ci trenować niezależnie od pogody. Integracja i sport w jednym miejscu.",
        icon: Trophy,
        link: "https://golfklub.pl/", // Placeholder URL
        color: "from-blue-900/20 to-transparent"
    }
];

const ComplexDiscover = () => {
    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
            <div className="noise-bg absolute inset-0 opacity-[0.1]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold tracking-[0.3em] font-serif text-sm uppercase">KOMPLEKS</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wider mt-2 mb-4">ODKRYJ NASZE MIEJSCA</h2>
                    <div className="w-20 h-px bg-gold mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {spaces.map((space, index) => (
                        <motion.a
                            key={index}
                            href={space.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`group relative p-10 bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-500 block shadow-2xl`}
                        >
                            {/* Gradient Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${space.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                <div className="p-5 rounded-2xl bg-black/50 border border-gold/10 group-hover:border-gold/50 group-hover:scale-110 transition-all duration-500">
                                    <space.icon className="w-10 h-10 text-gold stroke-[1px]" />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-serif text-white tracking-widest">{space.title}</h3>
                                    <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-xs mx-auto">
                                        {space.description}
                                    </p>
                                </div>

                                <div className="pt-4 flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:gap-4">
                                    Odwiedź stronę <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Background decorative text */}
            <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none select-none">
                <span className="text-[300px] font-serif font-bold text-white leading-none">LEGEND</span>
            </div>
        </section>
    );
};

export default ComplexDiscover;
