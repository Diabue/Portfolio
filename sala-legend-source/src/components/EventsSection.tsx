import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Ticket, ExternalLink, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface AppEvent {
    id: string;
    title: string;
    description: string;
    event_date: string;
    price: number;
    image_url: string;
    stripe_link: string;
    details_link: string;
    is_recurring: boolean;
    recurring_day: string;
    active: boolean;
}

// Static demo events for portfolio showcase
const DEMO_EVENTS: AppEvent[] = [
    {
        id: '1',
        title: 'Wieczór Jazzowy',
        description: 'Zapraszamy na wyjątkowy wieczór z muzyką jazzową w klimatycznych wnętrzach Sali Legend. Doskonałe wino, świetna muzyka i niezapomniana atmosfera.',
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        price: 0,
        image_url: '',
        stripe_link: '',
        details_link: '#',
        is_recurring: false,
        recurring_day: '',
        active: true
    },
    {
        id: '2',
        title: 'Bankiet Firmowy',
        description: 'Organizujemy ekskluzywne bankiety firmowe. Idealna przestrzeń na spotkania biznesowe, konferencje i uroczystości dla Twojej firmy.',
        event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        price: 0,
        image_url: '',
        stripe_link: '',
        details_link: '#',
        is_recurring: true,
        recurring_day: 'Co sobotę',
        active: true
    },
    {
        id: '3',
        title: 'Wesele Marzeń',
        description: 'Ekskluzywna oprawa wesel w niepowtarzalnym klimacie. Sala Legend to miejsce, gdzie Wasze wesele stanie się niezapomnianym wydarzeniem.',
        event_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        price: 0,
        image_url: '',
        stripe_link: '',
        details_link: '#',
        is_recurring: false,
        recurring_day: '',
        active: true
    }
];

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).toUpperCase();
};

const EventsSection = () => {
    const [events] = useState<AppEvent[]>(DEMO_EVENTS);
    const [registrationEvent, setRegistrationEvent] = useState<AppEvent | null>(null);
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '',
        agreementTerms: false, agreementData: false, agreementImage: false, agreementMarketing: false
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegistrationEvent(null);
        setFormData({ name: '', phone: '', email: '', agreementTerms: false, agreementData: false, agreementImage: false, agreementMarketing: false });
        alert('Dziękujemy za rejestrację! (Demo portfolio — formularz nieaktywny)');
    };

    return (
        <section id="aktualnosci" className="py-24 bg-[#111] relative overflow-hidden">
            <div className="noise-bg absolute inset-0 opacity-[0.1]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Sparkles className="text-gold w-6 h-6" />
                        <span className="text-gold tracking-[0.3em] font-serif text-sm uppercase">Nadchodzące Wydarzenia</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wider mb-4">AKTUALNOŚCI I EVENTY</h2>
                    <div className="w-20 h-px bg-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-[#1a1614] border border-white/5 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-500 shadow-xl flex flex-col"
                        >
                            <div className="p-8 space-y-4 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-[10px] text-gold/60 font-sans tracking-[0.2em] uppercase">
                                    <Calendar className="w-3 h-3" />
                                    <span>{event.is_recurring ? event.recurring_day : formatDate(event.event_date)}</span>
                                </div>

                                <h3 className="text-xl font-serif text-white tracking-wide group-hover:text-gold transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-gray-400 font-sans leading-relaxed text-sm flex-1">
                                    {event.description}
                                </p>

                                <div className="pt-6 flex flex-col gap-3">
                                    <button
                                        onClick={() => setRegistrationEvent(event)}
                                        className="w-full bg-gold hover:bg-[#b08d4a] text-black text-xs font-bold tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                                    >
                                        ZAPISZ SIĘ <Ticket className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={event.details_link}
                                        className="text-gray-500 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                                    >
                                        SZCZEGÓŁY WYDARZENIA <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {registrationEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                    >
                        <div className="bg-[#111] p-6 md:p-8 rounded-3xl w-full max-w-md border border-white/5 space-y-6 relative shadow-[0_10px_50px_rgba(195,155,87,0.1)]">
                            <button
                                onClick={() => setRegistrationEvent(null)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl font-serif text-white uppercase tracking-widest text-center">Dane Kontaktowe</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] text-center">Zostaw namiary zanim przejdziesz do kasy</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Imię i Nazwisko</label>
                                    <input required type="text" className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl outline-none focus:border-gold/50 text-white transition-all shadow-inner text-sm"
                                        placeholder="Jan Kowalski" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Adres E-mail</label>
                                    <input required type="email" className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl outline-none focus:border-gold/50 text-white transition-all shadow-inner text-sm"
                                        placeholder="jan@domena.pl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Numer Telefonu</label>
                                    <input required type="tel" className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl outline-none focus:border-gold/50 text-white transition-all shadow-inner text-sm"
                                        placeholder="+48 000 000 000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                                <div className="pt-2 space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-start justify-center pt-0.5 shrink-0">
                                            <input required type="checkbox" className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-[#161616] checked:bg-gold checked:border-gold transition-all"
                                                checked={formData.agreementTerms} onChange={e => setFormData({...formData, agreementTerms: e.target.checked})} />
                                            <CheckCircle2 className="absolute text-black w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none top-[5px]" />
                                        </div>
                                        <span className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-400 transition-colors">Akceptuję Regulamin Wydarzenia. *</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-start justify-center pt-0.5 shrink-0">
                                            <input required type="checkbox" className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-[#161616] checked:bg-gold checked:border-gold transition-all"
                                                checked={formData.agreementData} onChange={e => setFormData({...formData, agreementData: e.target.checked})} />
                                            <CheckCircle2 className="absolute text-black w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none top-[5px]" />
                                        </div>
                                        <span className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-400 transition-colors">Wyrażam zgodę na przetwarzanie moich danych osobowych. *</span>
                                    </label>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-gold text-black py-4 rounded-xl font-bold tracking-[0.2em] hover:bg-[#b08d4a] transition-all flex justify-center items-center gap-2 group text-xs shadow-[0_5px_20px_-10px_rgba(195,155,87,0.5)]">
                                        ZAPISZ SIĘ <Ticket className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default EventsSection;
