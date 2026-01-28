
import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { GOOGLE_MAPS_URL, PHONE_NUMBER, ADDRESS } from '../constants';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Symulacja wysyłania
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      alert("Wiadomość wysłana, dziękujemy!");
      
      // Reset powiadomienia w UI po 5 sekundach
      setTimeout(() => setShowSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="kontakt" className="py-24 bg-zinc-950 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-yellow-400 text-sm font-black uppercase tracking-[0.3em] mb-4 font-orbitron italic">Kontakt</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight font-orbitron italic uppercase">Masz pytania? <br />Chętnie doradzimy!</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-yellow-400 shrink-0 group hover:bg-yellow-400 hover:text-black transition-all duration-300">
                  <Phone size={26} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Infolinia</p>
                  <a href={`tel:${PHONE_NUMBER}`} className="text-2xl font-black text-white hover:text-yellow-400 transition-colors tracking-tight font-orbitron italic">{PHONE_NUMBER}</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-yellow-400 shrink-0 group hover:bg-yellow-400 hover:text-black transition-all duration-300">
                  <MapPin size={26} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Adres Studio</p>
                  <p className="text-xl font-black text-white leading-tight font-orbitron italic">{ADDRESS}</p>
                  <a 
                    href={GOOGLE_MAPS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-yellow-400 text-sm font-bold hover:underline mt-2 inline-block"
                  >
                    Nawiguj do nas →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-yellow-400 shrink-0 group hover:bg-yellow-400 hover:text-black transition-all duration-300">
                  <Clock size={26} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1 font-orbitron">Godziny pracy</p>
                  <p className="text-white font-bold font-orbitron italic">Pn - Pt: 8:00 - 18:00</p>
                  <p className="text-zinc-400 font-medium font-orbitron italic">Sb - Nd: ZAMKNIĘTE</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-900/40 p-10 rounded-[32px] border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <input required type="text" placeholder="Imię i nazwisko" className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all" />
                <input required type="tel" placeholder="Numer telefonu" className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all" />
              </div>
              <textarea required placeholder="W czym możemy pomóc? Opisz zakres prac..." rows={4} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 mb-6 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all resize-none"></textarea>
              
              <button 
                disabled={isSubmitting}
                className={`w-full font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg font-orbitron uppercase italic ${showSuccess ? 'bg-green-500 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/10'}`}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
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
                <p className="text-green-400 text-center text-xs font-black mt-4 font-orbitron uppercase italic animate-bounce">
                  Dziękujemy! Odezwiemy się niebawem.
                </p>
              )}
            </form>
          </div>

          <div className="h-full min-h-[600px] w-full relative group">
            <div className="absolute -inset-4 bg-yellow-400/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-zinc-800/50 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.2215352610734!2d16.850253077107713!3d52.287008571999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470451ea1d0c9d77%3A0x7ecb219f50f75351!2sW%26A%20Detailing%20-%20Pow%C5%82oki%20Ceramiczne%2F%20Elastomerowe%2F%20Grafenowe!5e0!3m2!1spl!2spl!4v1716300000000!5m2!1spl!2spl" 
                className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
