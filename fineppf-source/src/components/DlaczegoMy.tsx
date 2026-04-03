import { motion } from 'framer-motion';
import { CheckCircle2, Award, Clock } from 'lucide-react';

export default function DlaczegoMy() {
    return (
        <section id="dlaczego-my" className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Dlaczego FinePPF</h2>
                    <h3 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-6 leading-[1.2]">Twoje Źródło Ochrony</h3>
                    <p className="text-gray-600 text-lg">
                        Jako dystrybutor zaawansowanych folii ochronnych, stawiamy na jakość, technologię i partnerstwo.
                        Dostarczamy rozwiązania, które sprawdzają się w najtrudniejszych warunkach.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group hover:border-gray-200"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Award className="w-24 h-24 text-primary" />
                        </div>
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <Award className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="text-xl font-orbitron font-bold text-black mb-4 relative z-10">Nowoczesna TPU</h4>
                        <p className="text-gray-600 leading-relaxed relative z-10">
                            Nasze folie to szczyt inżynierii materiałowej. Oferujemy wyłącznie folie poliuretanowe (TPU) z zaawansowaną warstwą samoregenerującą i wysoką odpornością na UV.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group hover:border-gray-200"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <CheckCircle2 className="w-24 h-24 text-primary" />
                        </div>
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <CheckCircle2 className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="text-xl font-orbitron font-bold text-black mb-4 relative z-10">Wsparcie Partnerów</h4>
                        <p className="text-gray-600 leading-relaxed relative z-10">
                            Nie tylko sprzedajemy folię. Naszym partnerom oferujemy dostęp do oprogramowania z szablonami, szkolenia techniczne oraz wsparcie marketingowe w rozwoju biznesu.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group hover:border-gray-200"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Clock className="w-24 h-24 text-primary" />
                        </div>
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <Clock className="w-7 h-7 text-primary" />
                        </div>
                        <h4 className="text-xl font-orbitron font-bold text-black mb-4 relative z-10">Dostępność i Wysyłka</h4>
                        <p className="text-gray-600 leading-relaxed relative z-10">
                            Prowadzimy własny magazyn w Polsce, co gwarantuje natychmiastową wysyłkę. Zamówione materiały trafiają do Twojego studia najszybciej jak to możliwe.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
