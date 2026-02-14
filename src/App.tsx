import Hero from './components/Hero';
import { useTranslation } from 'react-i18next';
import Career from './components/Career';
import Projects from './components/Projects';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';
import './App.css';

function App() {
  const { t } = useTranslation();
  return (
    <div className="app">
      <LanguageSwitcher />
      <Hero />
      <Career />
      <Projects />

      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Max. {t('footer.rights')}</p>
      </footer>
    </div>
  );
}

export default App;
