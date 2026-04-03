import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
const Contact = () => {
    return (
        <section id="kontakt" className="bg-[#0a0a0a] text-white py-24 relative overflow-hidden">
            <div className="noise-bg absolute inset-0 opacity-[0.1]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* Left Column: Info & Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <span className="text-gold tracking-[0.3em] font-serif text-sm uppercase">KONTAKT</span>
                            <h2 className="text-4xl md:text-5xl font-serif tracking-wider leading-tight uppercase">
                                MASZ PYTANIA?<br />
                                NAPISZ DO NAS!
                            </h2>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#111] border border-gold/10 flex items-center justify-center rounded-xl shrink-0 group hover:border-gold/50 transition-colors">
                                    <Phone className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-sans tracking-widest uppercase mb-1">TELEFON</p>
                                    <a href="tel:+48515261262" className="text-2xl font-sans font-bold tracking-tight text-white hover:text-gold transition-colors block">
                                        +48 515 261 262
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#111] border border-gold/10 flex items-center justify-center rounded-xl shrink-0 group hover:border-gold/50 transition-colors">
                                    <MapPin className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-sans tracking-widest uppercase mb-1">ADRES</p>
                                    <p className="text-lg font-sans text-gray-300">Klasztorna 7, 62-040 Puszczykowo</p>
                                    <a
                                        href="https://www.google.com/maps/place/Muzeum+Polskiej+Motoryzacji+w+Puszczykowie/@52.2926198,16.8499742,395m/data=!3m1!1e3!4m6!3m5!1s0x47045139aade115f:0x30a4e0fdf154edc1!8m2!3d52.2928657!4d16.8494964!16s%2Fg%2F11vb5dkgkx?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gold text-xs tracking-widest font-bold mt-1 inline-block hover:underline"
                                    >
                                        NAWIGUJ DO NAS →
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-[#111] border border-gold/10 flex items-center justify-center rounded-xl shrink-0 group hover:border-gold/50 transition-colors">
                                    <Clock className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-sans tracking-widest uppercase mb-1">DOSTĘPNOŚĆ TELEFONU</p>
                                    <p className="text-gray-300 font-sans">Codziennie w godzinach: 8:00 - 18:00</p>
                                    <p className="text-gray-400 font-sans text-xs mt-1">Linia zajęta? Napisz SMS – skontaktujemy się!</p>
                                    <div className="mt-8 p-4 bg-gold/5 border border-gold/10 rounded-2xl">
                                        <p className="text-[10px] text-gold tracking-widest uppercase mb-2">LOKALIZACJA</p>
                                        <p className="text-gray-400 text-xs leading-relaxed font-sans">
                                            Znajdujemy się w Puszczykowie, zaledwie <span className="text-white font-bold">15 minut od Poznania</span>, w malowniczym otoczeniu <span className="text-white font-bold">Wielkopolskiego Parku Narodowego</span>. Idealny dojazd z miast: Luboń, Mosina i Komorniki.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-full min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden border border-white/10 grayscale-[0.5] hover:grayscale-0 transition-all duration-700 shadow-2xl"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2891.4875532356396!2d16.8499742!3d52.2926198!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045139aade115f%3A0x30a4e0fdf154edc1!2sMuzeum%20Polskiej%20Motoryzacji%20w%20Puszczykowie!5e1!3m2!1spl!2spl!4v1771940922628!5m2!1spl!2spl"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '600px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
