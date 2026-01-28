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
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        borderTop: '1px solid #333',
        marginTop: 'auto'
      }}>
        <p>&copy; {new Date().getFullYear()} Max. {t('footer.rights')}</p>
      </footer>
    </div>
  );
}

export default App;
