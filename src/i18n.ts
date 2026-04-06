import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'pl',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            pl: {
                translation: {
                    hero: {
                        headlineFirst: "Strony, które naprawdę",
                        headlineAccent: "SPROWADZAJĄ KLIENTÓW",
                        headlineLast: "Do Twojej Firmy",
                        subheadline: "Projektuję nowoczesne strony dla lokalnych firm, które chcą więcej telefonów, lepszej obecności w sieci i realnego wzrostu sprzedaży.",
                        cta: "DARMOWA WYCENA",
                        priceLine: "Strony od 1000 zł • Szybka realizacja • Prosty proces",
                        advancedLine: "Systemy z płatnościami online i automatyzacją biznesu",
                        trust: "Szybki czas reakcji • Brak długoterminowych umów"
                    },
                    services: {
                        title: "Rozwiązania, Które",
                        titleAccent: "Działają",
                        s1_title: "Strona Firmowa",
                        s1_price: "Od 1000 zł",
                        s1_problem: "Profesjonalna wizytówka dla lokalnych firm, która buduje autorytet i przyciąga nowych klientów.",
                        s1_perfect: "Idealne dla: barberów, siłowni, usług lokalnych",
                        s1_result: "Wynik: więcej telefonów i zaufanie klientów",
                        s2_title: "Landing Page",
                        s2_price: "Od 900 zł",
                        s2_problem: "Skoncentrowana strona zaprojektowana tak, aby zamieniać odwiedzających w płacących klientów.",
                        s2_perfect: "Idealne pod reklamy lub konkretne oferty",
                        s2_result: "Wynik: wysoki współczynnik konwersji",
                        s3_title: "Sklep Internetowy",
                        s3_price: "Od 1500 zł",
                        s3_problem: "Proste i skuteczne strony e-commerce. Sprzedawaj bez technicznych bólów głowy.",
                        s3_perfect: "Sprzedawaj swoje produkty 24/7",
                        s3_result: "Wynik: łatwa sprzedaż online",
                        s4_title: "Systemy Rezerwacji i Płatności",
                        s4_price: "Od 2500–3000 zł",
                        s4_problem: "Kompletny system rezerwacji i płatności online. Twoi klienci kupują, Ty skupiasz się na pracy.",
                        s4_perfect: "Automatyzacja, oszczędność czasu i więcej klientów",
                        s4_result: "Wynik: Biznes działający bez Twojego udziału"
                    },
                    whyme: {
                        title: "Konkrety, Nie",
                        titleAccent: "Obietnice",
                        p1_title: "Gotowa w kilka dni, nie tygodnie",
                        p1_desc: "Czas to pieniądz. Twój projekt będzie gotowy błyskawicznie, bez zbędnego czekania.",
                        p2_title: "Buduj zaufanie od pierwszej sekundy",
                        p2_desc: "Design, który sprawia, że wyglądasz na lidera w swojej branży już na starcie.",
                        p3_title: "Zero technicznego bełkotu",
                        p3_desc: "Prosta komunikacja — ja zajmuję się wszystkim, Ty skupiasz się na prowadzeniu firmy.",
                        p4_title: "Skupienie na Twoim zysku",
                        p4_desc: "Każda strona jest budowana po to, by zdobywać klientów, a nie tylko 'dobrze wyglądać'."
                    },
                    pricing: {
                        title: "Jak Działają",
                        titleAccent: "Ceny",
                        variables: "Finalna cena zależy od kilku kluczowych czynników:",
                        f1: "ilość podstron oraz ilość treści",
                        f2: "funkcjonalności i integracje (np. płatności, systemy rezerwacji)",
                        f3: "stopień skomplikowania designu i animacji",
                        trust1: "Zawsze otrzymujesz jasną wycenę przed rozpoczęciem prac",
                        trust2: "Zero ukrytych kosztów i drobnego druku",
                        simple: "Proste strony zaczynają się od 1000 zł",
                        advanced: "Zaawansowane systemy zazwyczaj 2000–3000 zł+",
                        cta: "Potrzebujesz strony lub systemu dla firmy?"
                    },
                    projects: {
                        title: "Realne",
                        titleAccent: "Wyniki Biznesowe",
                        p1_title: "System dla Sali Eventowej",
                        p1_prob: "Zakres: System rezerwacji, płatności online, panel administratora.",
                        p1_sol: "Rozwiązanie: Luksusowa strona z pełną automatyzacją sprzedaży terminów.",
                        p1_res: "Budżet: 2000–3000 zł (Klient oszczędza 15h tygodniowo na rezerwacjach).",
                        p2_title: "Strona Studia Detailingu",
                        p2_prob: "Zakres: Sprzedażowy landing page skupiony na konwersji klientów premium.",
                        p2_sol: "Rozwiązanie: Nowoczesny design budujący autorytet i pokazujący wyniki pracy.",
                        p2_res: "Budżet: 1200–1500 zł (Skokowy wzrost zapytań o luksusowe pakiety).",
                        p3_title: "System CRM AI",
                        p3_prob: "Zakres: Automatyzacja kontaktu AI, research leadów i synchronizacja danych.",
                        p3_sol: "Rozwiązanie: System, który sam wyszukuje i kontaktuje się z klientami.",
                        p3_res: "Budżet: Wyborny zwrot z inwestycji (ROI) przez oszczędność czasu.",
                        open: "ZOBACZ SZCZEGÓŁY"
                    },
                    process: {
                        title: "Prosty Proces,",
                        titleAccent: "Zero Stresu",
                        trust: "Żadna wiedza techniczna nie jest Ci potrzebna.",
                        step1: "Kontaktujesz się ze mną",
                        step2: "Poznaję Twój biznes i cele",
                        step3: "Buduję i wdrażam Twoją stronę",
                        step4: "Zaczynasz pozyskiwać klientów"
                    },
                    social: {
                        title: "Wiarygodne",
                        titleAccent: "Opinie",
                        t1_author: "Marek, Sala Legend",
                        t1_text: "System rezerwacji i nowa strona to był strzał w dziesiątkę. Oszczędzamy mnóstwo czasu, a klienci chwalą prostotę płatności.",
                        t2_author: "Kamil, FinePPF",
                        t2_text: "Dzięki nowemu landing page'owi w końcu docieramy do klientów premium. Strona idealnie oddaje jakość naszych usług.",
                        t3_author: "Tomasz, Usługi Lokalne",
                        t3_text: "Szybko, konkretnie i bez problemu. Strona działa idealnie na telefonie i faktycznie dzwoni więcej osób."
                    },
                    cta_final: {
                        title: "Chcesz Strony, Która",
                        titleAccent: "Pomaga Zarabiać?",
                        text: "Proste strony od 1000 zł. Zaawansowane systemy z rezerwacjami od 2500 zł.",
                        button: "ODBIERZ DARMOWĄ WYCENĘ"
                    },
                    contact: {
                        title: "Zacznijmy",
                        titleAccent: "Dziś",
                        subtitle: "Zazwyczaj odpowiadam w ciągu kilku godzin. Wybierz dogodną formę kontaktu.",
                        phone: "Telefon",
                        email: "E-mail",
                        send: "WYŚLIJ WIADOMOŚĆ"
                    },
                    footer: {
                        rights: "MKSites. Wszystkie prawa zastrzeżone."
                    }
                }
            },
            en: {
                translation: {
                    hero: {
                        headlineFirst: "Websites that actually",
                        headlineAccent: "BRING CUSTOMERS",
                        headlineLast: "To Your Business",
                        subheadline: "I design fast, modern websites for local businesses that want more calls, more clients, and better online presence.",
                        cta: "GET A FREE QUOTE",
                        priceLine: "Websites from 1000 zł • Fast delivery • Simple process",
                        advancedLine: "Systems with online payments and automation",
                        trust: "Quick response • No long-term contracts"
                    },
                    services: {
                        title: "Solutions That",
                        titleAccent: "Convert",
                        s1_title: "Business Website",
                        s1_price: "From 1000 zł",
                        s1_problem: "A clean, modern website that makes your business look professional and trustworthy.",
                        s1_perfect: "Perfect for: barbers, gyms, local services",
                        s1_result: "Result: more calls and customer trust",
                        s2_title: "Landing Page",
                        s2_price: "From 900 zł",
                        s2_problem: "A focused page designed to convert visitors into clients.",
                        s2_perfect: "Perfect for ads or specific offers",
                        s2_result: "Result: higher conversion rate",
                        s3_title: "Online Store",
                        s3_price: "From 1500 zł",
                        s3_problem: "Simple and effective e-commerce websites. Sell your products without technical headaches.",
                        s3_perfect: "Sell your products 24/7",
                        s3_result: "Result: easy sales online",
                        s4_title: "Booking & Payment System",
                        s4_price: "From 2500–3000 zł",
                        s4_problem: "Complete online booking and payment system. Your clients buy, you stay focused on work.",
                        s4_perfect: "Automation, time savings, and more clients",
                        s4_result: "Result: Business running without your constant involvement"
                    },
                    whyme: {
                        title: "Results, Not",
                        titleAccent: "Just Promises",
                        p1_title: "Ready in days, not weeks",
                        p1_desc: "Time is money. Your project will be ready fast, with no unnecessary waiting.",
                        p2_title: "Build trust from the first second",
                        p2_desc: "Design that makes you look like a leader in your industry right from the start.",
                        p3_title: "No technical headaches",
                        p3_desc: "Simple communication — I handle everything, you focus on running your business.",
                        p4_title: "Focused on results",
                        p4_desc: "Every website is built to get you clients, not just to 'look good'."
                    },
                    pricing: {
                        title: "How Pricing",
                        titleAccent: "Works",
                        variables: "The final price depends on several key factors:",
                        f1: "number of pages and content amount",
                        f2: "features and integrations (e.g. payments, booking systems)",
                        f3: "design and animation complexity",
                        trust1: "You always get a clear quote before we start",
                        trust2: "Zero hidden costs and fine print",
                        simple: "Simple websites start from 1000 zł",
                        advanced: "Advanced systems usually 2000–3000 zł+",
                        cta: "Need a website or system for your business?"
                    },
                    projects: {
                        title: "Real",
                        titleAccent: "Business Results",
                        p1_title: "Event Venue System",
                        p1_prob: "Scope: Booking system, online payments, admin panel.",
                        p1_sol: "Solution: Luxury site with full automated sales terminal.",
                        p1_res: "Budget: 2000–3000 zł (Client saves 15h/week on bookings).",
                        p2_title: "Detailing Studio Website",
                        p2_prob: "Scope: Sales-focused landing page targeted at premium clients.",
                        p2_sol: "Solution: Modern design building authority and showcasing work.",
                        p2_res: "Budget: 1200–1500 zł (Massive jump in luxury package inquiries).",
                        p3_title: "CRM AI System",
                        p3_prob: "Scope: AI outreach automation, lead research, and data sync.",
                        p3_sol: "Solution: System that automatically finds and contacts clients.",
                        p3_res: "Budget: Excellent ROI through extreme time savings.",
                        open: "SEE DETAILS"
                    },
                    process: {
                        title: "Simple Process,",
                        titleAccent: "No Stress",
                        trust: "No technical knowledge needed on your part.",
                        step1: "You contact me",
                        step2: "I understand your business goals",
                        step3: "I build and launch your website",
                        step4: "You start getting clients"
                    },
                    social: {
                        title: "Believable",
                        titleAccent: "Reviews",
                        t1_author: "Mark, Sala Legend",
                        t1_text: "The booking system and new site was a game changer. We save ton of time, and clients praise the simple checkout.",
                        t2_author: "Kamil, FinePPF",
                        t2_text: "Thanks to the new landing page, we finally reach premium clients. It perfectly reflects our quality of service.",
                        t3_author: "Thomas, Local Services",
                        t3_text: "Fast, solid, and no problems. Site works perfectly on mobile and more people are calling."
                    },
                    cta_final: {
                        title: "Want a Website That",
                        titleAccent: "Helps You Make Money?",
                        text: "Simple websites from 1000 zł. Advanced booking systems from 2500 zł.",
                        button: "GET YOUR FREE QUOTE"
                    },
                    contact: {
                        title: "Start",
                        titleAccent: "Today",
                        subtitle: "I usually respond within a few hours. Choose your preferred contact method.",
                        phone: "Phone",
                        email: "Email",
                        send: "SEND MESSAGE"
                    },
                    footer: {
                        rights: "MKSites. All rights reserved."
                    }
                }
            }
        }
    });

export default i18n;
