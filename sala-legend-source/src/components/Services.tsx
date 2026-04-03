import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

// Family dinners image
import obiadyRodzinneImg from '../assets/obiady-rodzinne.jpg';
import asset4 from '../assets/asset (4).jpeg';
import piknikImg from '../assets/piknik.png';
const Services = () => {
    const services = [
        {
            title: "OBIADY RODZINNE",
            subtitle: "Roczki, Komunie, Jubileusze",
            description: "Niezapomniane rodzinne chwile w kameralnej atmosferze. Zapraszamy do miejsca stworzonego z myślą o bliskości.",
            longDescription: "Z największą starannością przygotujemy dla Państwa przyjęcie, w którym główną rolę grają rodzinne emocje i radosne chwile w gronie najbliższych. Specjalizujemy się w organizacji kameralnych obiadów, roczków, komunii oraz jubileuszy, w których zależy nam na luźnej i swobodnej atmosferze. W ramach obsługi skupiamy się wyłącznie na udostępnieniu wyselekcjonowanego cateringu, dbając o pyszne menu, tak abyście Wy mogli w pełni poświęcić czas sobie i swoim bliskim.",
            features: ["Kameralna atmosfera", "Staranny catering", "Klimatyzowana sala", "Wyjątkowe wnętrza"],
            image: obiadyRodzinneImg,
        },
        {
            title: "EVENTY FIRMOWE",
            subtitle: "Konferencje, Bankiety, Gale",
            description: "Prestiżowa przestrzeń eventowa, która zrobi wrażenie na Twoich kontrahentach i pracownikach.",
            longDescription: "Sala Legend to miejsce, gdzie biznes spotyka się z historią. Oferujemy kompleksową obsługę eventów firmowych – od kameralnych spotkań zarządu, przez szkolenia i konferecje, aż po wystawne bankiety i gale. Nowoczesne zaplecze techniczne w połączeniu z klimatem retro sprawia, że każde wydarzenie nabiera wyjątkowego charakteru.",
            features: ["Nagłośnienie i rzutnik", "Catering biznesowy", "Możliwość zwiedzania muzeum", "Parking dla gości"],
            image: asset4,
        },
        {
            title: "PIKNIKI I OGNISKA",
            subtitle: "Spotkania plenerowe, Integracje",
            description: "Odkryj nasz urokliwy teren zewnętrzny, idealny na luźniejsze spotkania w gronie znajomych lub zespołu.",
            longDescription: "Poza elegancką salą dysponujemy również rozległym terenem zielonym, który idealnie nadaje się na organizację pikników firmowych, ognisk oraz spotkań integracyjnych pod gołym niebem. To doskonała alternatywa dla tradycyjnych przyjęć, pozwalająca na swobodną atmosferę i kontakt z naturą, nie rezygnując przy tym z pełnego zaplecza gastronomicznego.",
            features: ["Miejsce na ognisko", "Zadaszone wiaty", "Atrakcje dla dzieci", "Pyszne grill menu"],
            image: piknikImg,
        }
    ];

    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

    return (
        <section id="oferta" className="py-24 bg-[#f5f1ea] relative">
            <div className="noise-bg absolute inset-0 opacity-[0.03]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-wider mb-4">NASZA OFERTA</h2>
                    <div className="w-20 h-px bg-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white group overflow-hidden shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 rounded-2xl"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={`${service.title} - Sala Legend Puszczykowo`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                            </div>
                            <div className="p-8 text-center bg-white flex flex-col">
                                <span className="text-gold text-[10px] tracking-[0.3em] font-serif uppercase mb-2 block">{service.subtitle}</span>
                                <h3 className="text-xl font-serif font-bold mb-4 tracking-widest">{service.title}</h3>
                                <p className="text-gray-600 mb-8 font-sans leading-relaxed text-sm min-h-[48px]">
                                    {service.description}
                                </p>
                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="border border-[#b08d4a] text-[#b08d4a] hover:bg-[#b08d4a] hover:text-white px-8 py-3 transition-all duration-300 font-serif text-sm tracking-widest rounded-full"
                                >
                                    WIĘCEJ INFORMACJI
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full md:w-5/12 h-64 md:h-auto relative">
                                <img
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:hidden" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-7/12 p-8 md:p-12 space-y-6">
                                <div>
                                    <span className="text-gold tracking-[0.3em] font-serif text-xs uppercase mb-2 block">{selectedService.subtitle}</span>
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{selectedService.title}</h3>
                                </div>
                                <div className="w-16 h-px bg-gold"></div>
                                <p className="text-gray-600 font-sans leading-relaxed text-lg">
                                    {selectedService.longDescription}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {selectedService.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                                            <span className="text-gray-700 font-sans text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-8">
                                    <button
                                        onClick={() => {
                                            setSelectedService(null);
                                            document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="bg-gold hover:bg-[#b08d4a] text-white px-10 py-4 font-serif tracking-widest transition-all duration-300 w-full md:w-auto rounded-full"
                                    >
                                        ZAPYTAJ O TERMIN
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;
