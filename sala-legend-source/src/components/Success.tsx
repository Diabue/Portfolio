import { motion } from 'framer-motion';
import { CheckCircle2, Home, ArrowRight, Mail } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="noise-bg absolute inset-0 opacity-[0.1]"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-[#1a1614] border border-gold/20 p-12 rounded-3xl text-center relative z-10 shadow-2xl"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30"
          >
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-serif text-white mb-4 tracking-wider">PŁATNOŚĆ UDANA!</h1>
        <div className="w-12 h-px bg-gold mx-auto mb-6"></div>
        
        <p className="text-gray-400 font-sans leading-relaxed mb-8">
          Dziękujemy za zakup biletu do Sali Legend. Potwierdzenie zamówienia zostało wysłane na Twój adres e-mail.
        </p>

        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-gold/80 bg-gold/5 p-4 rounded-2xl border border-gold/10">
            <Mail className="w-5 h-5 shrink-0" />
            <span className="text-xs font-sans tracking-widest text-left">SPRAWDŹ SWOJĄ SKRZYNKĘ POCZTOWĄ</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.location.hash = ''}
            className="w-full bg-gold hover:bg-[#b08d4a] text-black font-serif tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
          >
            WRÓĆ DO STRONY GŁÓWNEJ <Home className="w-4 h-4" />
          </button>
          
          <a 
            href="https://www.facebook.com/people/Muzeum-Polskiej-Motoryzacji-w-Puszczykowie-Sala-Legend/100086392576326/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white text-[10px] tracking-[0.2em] uppercase py-2 transition-colors flex items-center justify-center gap-2"
          >
            OBSERWUJ NAS NA FACEBOOKU <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default SuccessPage;
