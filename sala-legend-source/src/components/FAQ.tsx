import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, ChevronRight } from 'lucide-react';
const FAQ = () => {
    const faqData = [
        {
            question: "Jaką pojemność ma Sala Legend?",
            answer: "Nasza przestrzeń jest elastyczna. Górna sala pomieści do 100 osób w ustawieniu bankietowym, natomiast dolna sala jest idealna na kameralne spotkania do 20 osób."
        },
        {
            question: "Czy na miejscu znajduje się parking?",
            answer: "Tak, dla naszych gości udostępniamy bezpłatny, monitorowany parking bezpośrednio przy obiekcie (na terenie Muzeum) z miejscami dla 50 samochodów."
        },
        {
            question: "Jak daleko od Poznania znajduje się sala?",
            answer: "Sala Legend położona jest w Puszczykowie, zaledwie 15-20 minut jazdy samochodem od centrum Poznania, w malowniczym sąsiedztwie Wielkopolskiego Parku Narodowego."
        },
        {
            question: "Czy sala jest klimatyzowana?",
            answer: "Tak, wszystkie nasze pomieszczenia są w pełni klimatyzowane, co zapewnia komfort gości o każdej porze roku."
        },
        {
            question: "Czy można połączyć wynajem sali ze zwiedzaniem Muzeum?",
            answer: "Oczywiście! To nasza unikalna cecha. Oferujemy pakiety łączące eleganckie przyjęcie z prywatnym oprowadzaniem po kolekcji zabytkowych motocykli i samochodów."
        }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <>
            {/* FAQ Floating Button */}
            <div className="flex justify-center pb-12 bg-[#0a0a0a]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-gold/20 rounded-full text-gold text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold hover:text-white transition-all duration-300 shadow-xl group"
                >
                    <HelpCircle className="w-4 h-4" />
                    Częste pytania (FAQ)
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#111] border border-gold/20 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-gold/10 to-transparent">
                                <div>
                                    <h3 className="text-2xl font-serif text-white tracking-wider">CZĘSTE PYTANIA</h3>
                                    <p className="text-gold/60 text-xs tracking-widest uppercase mt-1">Dowiedz się więcej o Sali Legend</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* FAQ Content */}
                            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                    {faqData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]"
                                        >
                                            <button
                                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                                className="w-full p-5 text-left flex justify-between items-center hover:bg-white/[0.03] transition-colors"
                                            >
                                                <span className="text-white font-medium pr-8">{item.question}</span>
                                                <ChevronRight
                                                    className={`w-5 h-5 text-gold transition-transform duration-300 ${activeIndex === index ? 'rotate-90' : ''}`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                                            {item.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-black/30 text-center border-t border-white/5">
                                <p className="text-gray-500 text-xs mb-4">Nie znalazłeś odpowiedzi? Skontaktuj się z nami bezpośrednio.</p>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-gold font-bold text-xs tracking-widest uppercase hover:underline"
                                >
                                    PRZEJDŹ DO KONTAKTU →
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FAQ JSON-LD Schema for SEO */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqData.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                })}
            </script>
        </>
    );
};

export default FAQ;
