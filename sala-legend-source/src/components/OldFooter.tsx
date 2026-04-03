import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111] text-white py-20 relative border-t border-gold/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-serif tracking-widest mb-8 uppercase">SKONTAKTUJ SIĘ Z NAMI</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <Phone className="w-5 h-5 text-gold" />
                                <span className="text-xl tracking-wider">+48 515 261 262</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <Mail className="w-5 h-5 text-gold" />
                                <span className="text-gray-400">biuro@salalegend.pl</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <MapPin className="w-5 h-5 text-gold" />
                                <span className="text-gray-400">ul. Przykładowa 123, Warszawa</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 text-center md:text-right">
                        <div className="font-serif text-3xl text-gold tracking-[0.3em] mb-4">SALA LEGEND</div>
                        <p className="text-gray-500 text-sm font-sans italic">
                            "Wyjątkowe chwile w otoczeniu historii"
                        </p>
                        <div className="mt-8 flex justify-center md:justify-end gap-6 text-gray-400">
                            <span className="hover:text-gold cursor-pointer transition-colors">Facebook</span>
                            <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 tracking-widest font-sans">
                    © {new Date().getFullYear()} SALA LEGEND. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
