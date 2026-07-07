import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Process from './components/Process';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import ThankYouPage from './components/ThankYouPage';
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
    <BrowserRouter>
      <div className={`app ${isMobile ? 'mobile' : ''}`}>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <main className="content-wrapper">
                <Hero />
                <Services />
                <WhyMe />
                <Projects />
                <Pricing />
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
            </>
          } />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
