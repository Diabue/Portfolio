import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PHONE_NUMBER, ADDRESS, GOOGLE_MAPS_URL } from '../constants';

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation of submission for portfolio demo
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => setShowSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="kontakt" className="py-24 bg-gray-50 scroll-mt-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4 font-orbitron italic">Kontakt</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-black mb-8 leading-[1.15] font-orbitron italic uppercase">Masz pytania? <br className="hidden sm:block" />Chętnie doradzimy!</h3>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-6">
                                <div className="bg-white border border-gray-200 p-5 rounded-2xl text-primary shrink-0 group hover:bg-primary hover:text-white transition-all duration-300">
                                    <Phone size={26} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Infolinia</p>
                                    <a href={`tel:${PHONE_NUMBER}`} className="text-2xl font-black text-black hover:text-primary transition-colors tracking-tight font-orbitron italic">{PHONE_NUMBER}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-white border border-gray-200 p-5 rounded-2xl text-primary shrink-0 group hover:bg-primary hover:text-white transition-all duration-300">
                                    <MapPin size={26} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Adres Studio</p>
                                    <p className="text-xl font-black text-black leading-tight font-orbitron italic">{ADDRESS}</p>
                                    <a
                                        href={GOOGLE_MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary text-sm font-bold hover:underline mt-2 inline-block"
                                    >
                                        Nawiguj do nas →
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-white border border-gray-200 p-5 rounded-2xl text-primary shrink-0 group hover:bg-primary hover:text-white transition-all duration-300">
                                    <Clock size={26} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Godziny pracy</p>
                                    <p className="text-black font-bold font-orbitron italic">Pn - Pt: 8:00 - 18:00</p>
                                    <p className="text-gray-500 font-medium font-orbitron italic">Sb - Nd: ZAMKNIĘTE</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[32px] border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Imię i nazwisko"
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Numer telefonu"
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Adres email"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-black placeholder:text-gray-400 mb-5 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            />
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="W czym możemy pomóc? Opisz zakres prac..."
                                rows={4}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-black placeholder:text-gray-400 mb-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                            ></textarea>

                            <button
                                disabled={isSubmitting}
                                className={`w-full font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg font-orbitron uppercase italic ${showSuccess ? 'bg-green-500 text-white' : 'bg-[#2563eb] hover:bg-[#2563eb]/90 text-white shadow-primary/20'}`}
                            >
                                {isSubmitting ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : showSuccess ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Wysłano!
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare size={20} />
                                        Wyślij zapytanie
                                    </>
                                )}
                            </button>

                            {showSuccess && (
                                <p className="text-green-600 text-center text-xs font-black mt-4 font-orbitron uppercase italic animate-bounce">
                                    Dziękujemy! Odezwiemy się niebawem.
                                </p>
                            )}
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full min-h-[600px] w-full relative group"
                    >
                        <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-gray-200 shadow-2xl bg-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.2215352610734!2d16.850253077107713!3d52.287008571999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470451ea1d0c9d77%3A0x7ecb219f50f75351!2sW%26A%20Detailing%20-%20Pow%C5%82oki%20Ceramiczne%2F%20Elastomerowe%2F%20Grafenowe!5e0!3m2!1spl!2spl!4v1716300000000!5m2!1spl!2spl"
                                className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
