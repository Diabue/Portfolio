import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ConfirmationPage from './components/ConfirmationPage';
import InquiryPage from './components/InquiryPage';
import './i18n';
import './App.css';

// Scrolls to the section matching the URL hash (e.g. mksites.pl/#pricing) on cold
// page loads, not just in-app nav clicks - Google Ads sitelinks land here directly
// before the page has finished mounting, so a plain browser hash-jump can miss.
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timer);
  }, [hash]);

  return null;
}

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
        <ScrollToHash />
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
          <Route path="/contact-received" element={<ConfirmationPage type="contact" />} />
          <Route path="/request-received" element={<ConfirmationPage type="request" />} />
          <Route path="/inquiry-received" element={<ConfirmationPage type="inquiry" />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
