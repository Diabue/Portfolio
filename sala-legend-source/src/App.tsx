import { useState, useEffect } from 'react'
import FAQ from './components/FAQ'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import EventsSection from './components/EventsSection'
import Contact from './components/Contact'
import ComplexDiscover from './components/ComplexDiscover'
import Stats from './components/Stats'
import CursorGlow from './components/CursorGlow'
import FullGallery from './components/FullGallery'

function App() {
  const [view, setView] = useState<'main' | 'gallery'>('main');
  const hasEvents = true; // Static for portfolio demo

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#galeria-pelna') setView('gallery');
      else setView('main');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (view === 'gallery') {
    return <FullGallery />;
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea] relative">
      <CursorGlow />
      <div className="fixed inset-0 noise-bg pointer-events-none z-[9999] opacity-[0.05]"></div>

      <Header hasEvents={hasEvents} />

      <main>
        <Hero hasEvents={hasEvents} />
        <Services />
        <WhyUs />
        <Stats />
        <Gallery />
        <EventsSection />
        <ComplexDiscover />
        <Contact />
        <FAQ />
      </main>

      <footer className="bg-[#050505] py-8 text-center border-t border-white/5">
        <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">© {new Date().getFullYear()} SALA LEGEND. WSZELKIE PRAWA ZASTRZEŻONE.</p>
      </footer>
    </div>
  )
}

export default App
