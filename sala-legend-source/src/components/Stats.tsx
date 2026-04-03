import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Zap } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: "1500+",
        label: "ZADOWOLONYCH GOŚCI",
    },
    {
        icon: Calendar,
        value: "100+",
        label: "ZORGANIZOWANYCH IMPREZ",
    },
    {
        icon: Trophy,
        value: "100%",
        label: "SATYSFAKCJI KLIENTÓW",
    },
    {
        icon: Zap,
        value: "2",
        label: "LUKSUSOWE SALE",
    },
];

const Stats = () => {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-500">
                                <stat.icon size={20} className="text-gold" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-tight group-hover:text-gold transition-colors duration-500">
                                {stat.value}
                            </h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium leading-relaxed">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
