import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Projects from './components/Projects';
import Process from './components/Process';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import LanguageSwitcher from './components/LanguageSwitcher';
import ParticlesBackground from './components/ParticlesBackground';
import './i18n';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`app ${isMobile ? 'mobile' : ''}`}>
      <ParticlesBackground />
      <LanguageSwitcher />

      <main className="content-wrapper">
        <Hero />
        <Services />
        <WhyMe />
        <Projects />
        <Process />
        <SocialProof />
        <FinalCTA />
        <Contact />
      </main>

      {!isMobile && (
        <footer style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '2rem',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          zIndex: 1000,
          opacity: 0.5
        }}>
          &copy; {new Date().getFullYear()} MKS. Wszystkie prawa zastrzeżone.
        </footer>
      )}
    </div>
  );
}

export default App;
