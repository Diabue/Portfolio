import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    hero: {
                        greeting: "Hi, I'm",
                        role: "IT Specialist & Aspiring Web Developer"
                    },
                    career: {
                        title: "My Career",
                        role_admin: "IT Administrator",
                        company_gk: "GolfKlub Puszczykowo",
                        period_gk: "2018 - Present",
                        desc_gk: "Managing IT infrastructure, network security, and user support.",
                        role_dev: "Web Developer",
                        company_freelance: "Freelance",
                        period_freelance: "2023 - Present",
                        desc_freelance: "Building modern websites and applications for clients."
                    },
                    projects: {
                        title: "My",
                        title_accent: "Projects",
                        p1_title: "Project One",
                        p1_desc: "A showcase of web development skills.",
                        p2_title: "Project Two",
                        p2_desc: "Interactive application interface.",
                        p3_title: "Project Three",
                        p3_desc: "Modern responsive design.",
                        open: "Open"
                    },
                    footer: {
                        rights: "All rights reserved."
                    }
                }
            },
            pl: {
                translation: {
                    hero: {
                        greeting: "Cześć, jestem",
                        role: "Specjalista IT i Przyszły Web Developer"
                    },
                    career: {
                        title: "Moja Kariera",
                        role_admin: "Administrator IT",
                        company_gk: "GolfKlub Puszczykowo",
                        period_gk: "2018 - Obecnie",
                        desc_gk: "Zarządzanie infrastrukturą IT, bezpieczeństwem sieci i wsparciem użytkowników.",
                        role_dev: "Web Developer",
                        company_freelance: "Freelancer",
                        period_freelance: "2023 - Obecnie",
                        desc_freelance: "Tworzenie nowoczesnych stron i aplikacji dla klientów."
                    },
                    projects: {
                        title: "Moje",
                        title_accent: "Projekty",
                        p1_title: "Projekt Jeden",
                        p1_desc: "Prezentacja umiejętności tworzenia stron www.",
                        p2_title: "Projekt Dwa",
                        p2_desc: "Interaktywny interfejs aplikacji.",
                        p3_title: "Projekt Trzy",
                        p3_desc: "Nowoczesny responsywny design.",
                        open: "Otwórz"
                    },
                    footer: {
                        rights: "Wszelkie prawa zastrzeżone."
                    }
                }
            }
        }
    });

export default i18n;
