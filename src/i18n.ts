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
                        trust: "Szybki czas reakcji • Brak długoterminowych umów"
                    },
                    services: {
                        title: "Rozwiązania, Które",
                        titleAccent: "Działają",
                        s1_title: "Strona Firmowa",
                        s1_problem: "Nowoczesna strona, która sprawia, że Twoja firma wygląda profesjonalnie i buduje zaufanie.",
                        s1_perfect: "Idealne dla: barberów, siłowni, usług lokalnych",
                        s1_result: "Wynik: więcej telefonów i zaufanie klientów",
                        s2_title: "Landing Page",
                        s2_problem: "Skoncentrowana strona zaprojektowana tak, aby zamieniać odwiedzających w klientów.",
                        s2_perfect: "Idealne pod reklamy lub konkretne oferty",
                        s2_result: "Wynik: wyższy współczynnik konwersji",
                        s3_title: "Sklep Internetowy",
                        s3_problem: "Proste i skuteczne strony e-commerce. Sprzedawaj bez technicznych bólów głowy.",
                        s3_perfect: "Sprzedawaj swoje produkty 24/7",
                        s3_result: "Wynik: łatwa sprzedaż online"
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
                    projects: {
                        title: "Realne",
                        titleAccent: "Wyniki Biznesowe",
                        p1_title: "Strona dla Sali Eventowej",
                        p1_prob: "Problem: Brak obecności online i rezerwacji.",
                        p1_sol: "Rozwiązanie: Luksusowa strona z galerią i jasnym CTA.",
                        p1_res: "Wynik: +40% więcej rezerwacji online.",
                        p2_title: "Strona dla Studia Detailingu",
                        p2_prob: "Problem: Stara strona odstraszała klientów premium.",
                        p2_sol: "Rozwiązanie: Nowoczesny design budujący autorytet.",
                        p2_res: "Wynik: Realny wzrost zapytań o luksusowe pakiety.",
                        p3_title: "System CRM AI",
                        p3_prob: "Problem: Chaos w leadach i 20h tygodniowo na maile.",
                        p3_sol: "Rozwiązanie: Automatyzacja kontaktu AI.",
                        p3_res: "Wynik: Oszczędność czasu i brak zgubionych leadów.",
                        open: "ZOBACZ PROJEKT"
                    },
                    process: {
                        title: "Prosty Proces,",
                        titleAccent: "Zero Stresu",
                        trust: "Żadna wiedza techniczna nie jest Ci potrzebna.",
                        step1: "Kontaktujesz się ze mną",
                        step2: "Poznaję Twój biznes",
                        step3: "Buduję Twoją stronę",
                        step4: "Zaczynasz pozyskiwać klientów"
                    },
                    social: {
                        title: "Wiarygodne",
                        titleAccent: "Opinie",
                        t1_author: "Marek, Właściciel Siłowni",
                        t1_text: "Strona wygląda niesamowicie i zaczęliśmy odbierać więcej telefonów już po kilku dniach.",
                        t2_author: "Anna, Studio Beauty",
                        t2_text: "W końcu mam stronę, której nie muszę się wstydzić przed klientkami premium.",
                        t3_author: "Tomasz, Mechanik",
                        t3_text: "Szybko, konkretnie i bez problemu. Strona działa idealnie na telefonie."
                    },
                    cta_final: {
                        title: "Chcesz Strony, Która",
                        titleAccent: "Pomaga Rozwijać Biznes?",
                        text: "Jeśli szukasz narzędzia, które faktycznie sprowadza klientów — porozmawiajmy.",
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
                        trust: "Quick response • No long-term contracts"
                    },
                    services: {
                        title: "Solutions That",
                        titleAccent: "Convert",
                        s1_title: "Business Website",
                        s1_problem: "A clean, modern website that makes your business look professional and trustworthy.",
                        s1_perfect: "Perfect for: barbers, gyms, local services",
                        s1_result: "Result: more calls and customer trust",
                        s2_title: "Landing Page",
                        s2_problem: "A focused page designed to convert visitors into clients.",
                        s2_perfect: "Perfect for ads or specific offers",
                        s2_result: "Result: higher conversion rate",
                        s3_title: "Online Store",
                        s3_problem: "Simple and effective e-commerce websites. Sell your products without technical headaches.",
                        s3_perfect: "Sell your products 24/7",
                        s3_result: "Result: easy sales online"
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
                    projects: {
                        title: "Real",
                        titleAccent: "Business Results",
                        p1_title: "Event Venue Website",
                        p1_prob: "Problem: No online presence and bookings.",
                        p1_sol: "Solution: Luxury site with gallery and clear CTA.",
                        p1_res: "Result: +40% more online bookings.",
                        p2_title: "Detailing Studio Website",
                        p2_prob: "Problem: Old site was scaring away premium clients.",
                        p2_sol: "Solution: Modern design building authority.",
                        p2_res: "Result: Real jump in inquiries for luxury packages.",
                        p3_title: "CRM AI System",
                        p3_prob: "Problem: 20h/week wasted on lead management.",
                        p3_sol: "Solution: AI contact automation.",
                        p3_res: "Result: Time savings and no lost leads.",
                        open: "SEE PROJECT"
                    },
                    process: {
                        title: "Simple Process,",
                        titleAccent: "No Stress",
                        trust: "No technical knowledge needed on your part.",
                        step1: "You contact me",
                        step2: "I understand your business",
                        step3: "I build your website",
                        step4: "You start getting clients"
                    },
                    social: {
                        title: "Believable",
                        titleAccent: "Reviews",
                        t1_author: "Mark, Gym Owner",
                        t1_text: "The website looks amazing and we started getting more calls within days.",
                        t2_author: "Anna, Beauty Studio",
                        t2_text: "Finally, I have a site I don't have to be ashamed of in front of premium clients.",
                        t3_author: "Thomas, Mechanic",
                        t3_text: "Fast, solid, and no problems. Site works perfectly on mobile."
                    },
                    cta_final: {
                        title: "Want a Website That",
                        titleAccent: "Actually Grows Your Business?",
                        text: "If you're looking for a tool that actually brings in clients — let's talk.",
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
