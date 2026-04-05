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
                        headlineFirst: "Zarabiaj",
                        headlineAccent: "WIĘCEJ",
                        headlineLast: "Dzięki Nowoczesnej Stronie WWW",
                        subheadline: "Twoja konkurencja już tu jest. Czy pozwolisz im odebrać swoich klientów? Buduję strony, które sprzedają, budują Twój wizerunek i dominują lokalny rynek.",
                        cta: "DARMOWA WYCENA W 24H",
                        trust: "Ponad 10 zadowolonych firm lokalnych"
                    },
                    services: {
                        title: "Rozwiązania, Które",
                        titleAccent: "Generują Zysk",
                        s1_title: "Strony Firmowe",
                        s1_problem: "Twoja stara strona odstrasza klientów?",
                        s1_result: "Buduję wizerunek lidera w Twojej branży.",
                        s2_title: "Landing Page",
                        s2_problem: "Reklamy nie przynoszą efektów?",
                        s2_result: "Maksymalizuję konwersję i liczbę zapytań.",
                        s3_title: "Sklepy Online",
                        s3_problem: "Skomplikowany proces zakupu?",
                        s3_result: "Upraszczam drogę do portfela klienta."
                    },
                    whyme: {
                        title: "Dlaczego To Ja Mam",
                        titleAccent: "Wybudować Twój Sukces?",
                        p1_title: "Błyskawiczna Dostawa",
                        p1_desc: "Czas to pieniądz. Twój projekt będzie gotowy, zanim Twoja konkurencja się zorientuje.",
                        p2_title: "Bezpośrednia Komunikacja",
                        p2_desc: "Żadnego korporacyjnego bełkotu. Rozmawiamy konkretnie o Twoim biznesie.",
                        p3_title: "Design Premium",
                        p3_desc: "Twoja firma będzie wyglądać na 10x większą i bardziej profesjonalną niż jest w rzeczywistości.",
                        p4_title: "Skupienie Na Wyniku",
                        p4_desc: "Nie robię 'ładnych stron'. Robię narzędzia, które przynoszą Ci realne pieniądze."
                    },
                    projects: {
                        title: "Projekty, Które",
                        titleAccent: "Już Zarabiają",
                        p1_title: "Sala Legend",
                        p1_desc: "Luksusowa strona eventowa – 40% więcej rezerwacji online.",
                        p2_title: "FinePPF",
                        p2_desc: "Studio detailingowe – Wizerunek premium, który przyciąga auta o wartości 500k+.",
                        p3_title: "CRM AI System",
                        p3_desc: "Automatyzacja sprzedaży – Oszczędność 20h tygodniowo na obsłudze leadów.",
                        open: "ZOBACZ WYNIK"
                    },
                    process: {
                        title: "Prosta Droga Do",
                        titleAccent: "Nowej Strony",
                        step1: "KONTAKT – Krótka wiadomość o Twoich potrzebach.",
                        step2: "ANALIZA – Szybka kawa/telefon, ustalamy cele.",
                        step3: "BUDOWA – Ty zajmujesz się firmą, ja buduję Twoją stronę.",
                        step4: "START – Publikujemy i zaczynasz zbierać leady."
                    },
                    social: {
                        title: "Co Mówią",
                        titleAccent: "Moi Klienci?",
                        t1_author: "Marek, Właściciel Gymu",
                        t1_text: "Moja stara strona była tragiczna. Po zmianie na nową, liczba zapisów na treningi personalne skoczyła o połowę w pierwszy miesiąc.",
                        t2_author: "Anna, Studio Beauty",
                        t2_text: "W końcu mam stronę, której nie muszę się wstydzić. Klientki mówią, że strona wygląda bardzo luksusowo.",
                        t3_author: "Tomasz, Mechanik",
                        t3_text: "Szybko, konkretnie i bez problemów. Strona działa na telefonie idealnie, a o to mi chodziło."
                    },
                    cta_final: {
                        title: "Przestań Tracić",
                        titleAccent: "Klientów Przez Słabą Stronę",
                        text: "Twój biznes zasługuje na to, by być widocznym. Każdy dzień zwłoki to pieniądze, które trafiają do konkurencji.",
                        button: "ODBIERZ DARMOWĄ KONSULTACJĘ"
                    },
                    contact: {
                        title: "Zacznijmy",
                        titleAccent: "Dziś",
                        subtitle: "Zostaw numer lub napisz maila. Oddzwonię z konkretną propozycją.",
                        phone: "Telefon",
                        email: "E-mail",
                        send: "WYŚLIJ WIADOMOŚĆ"
                    },
                    footer: {
                        rights: "Wszystkie prawa zastrzeżone."
                    }
                }
            },
            en: {
                translation: {
                    hero: {
                        headlineFirst: "Earn",
                        headlineAccent: "MORE",
                        headlineLast: "With A Modern Website",
                        subheadline: "Your competition is already here. Will you let them take your clients? I build sites that sell, build your image, and dominate the local market.",
                        cta: "FREE QUOTE IN 24H",
                        trust: "Over 10 satisfied local businesses"
                    },
                    services: {
                        title: "Solutions That",
                        titleAccent: "Generate Profit",
                        s1_title: "Business Websites",
                        s1_problem: "Is your old site scaring away clients?",
                        s1_result: "I build the image of a leader in your industry.",
                        s2_title: "Landing Pages",
                        s2_problem: "Ads not bringing results?",
                        s2_result: "I maximize conversion and inquiry counts.",
                        s3_title: "Online Stores",
                        s3_problem: "Complex checkout process?",
                        s3_result: "I simplify the path to the client's wallet."
                    },
                    whyme: {
                        title: "Why Should I",
                        titleAccent: "Build Your Success?",
                        p1_title: "Lightning Delivery",
                        p1_desc: "Time is money. Your project will be ready before your competition even notices.",
                        p2_title: "Direct Communication",
                        p2_desc: "No corporate fluff. We talk specifically about your business.",
                        p3_title: "Premium Design",
                        p3_desc: "Your company will look 10x larger and more professional than it really is.",
                        p4_title: "Results Driven",
                        p4_desc: "I don't make 'pretty sites'. I make tools that bring you real money."
                    },
                    projects: {
                        title: "Projects That",
                        titleAccent: "Are Already Earning",
                        p1_title: "Sala Legend",
                        p1_desc: "Luxury event site – 40% more online bookings.",
                        p2_title: "FinePPF",
                        p2_desc: "Detailing studio – Premium image attracting 500k+ value cars.",
                        p3_title: "CRM AI System",
                        p3_desc: "Sales automation – Savings of 20h per week on lead handling.",
                        open: "SEE RESULT"
                    },
                    process: {
                        title: "Simple Path To",
                        titleAccent: "A New Site",
                        step1: "CONTACT – A quick message about your needs.",
                        step2: "ANALYSIS – Fast coffee/call, we set goals.",
                        step3: "BUILD – You run your business, I build your site.",
                        step4: "LAUNCH – We publish and you start collecting leads."
                    },
                    social: {
                        title: "What Do",
                        titleAccent: "My Clients Say?",
                        t1_author: "Mark, Gym Owner",
                        t1_text: "My old site was tragic. After changing to the new one, personal training sign-ups jumped by half in the first month.",
                        t2_author: "Anna, Beauty Studio",
                        t2_text: "Finally, I have a site I don't have to be ashamed of. Clients say it looks very luxury.",
                        t3_author: "Thomas, Mechanic",
                        t3_text: "Fast, solid, and no problems. Site works perfectly on mobile, which is what I wanted."
                    },
                    cta_final: {
                        title: "Stop Losing",
                        titleAccent: "Clients To A Weak Site",
                        text: "Your business deserves to be seen. Every day of delay is money going to your competition.",
                        button: "GET FREE CONSULTATION"
                    },
                    contact: {
                        title: "Start",
                        titleAccent: "Today",
                        subtitle: "Leave a number or write an email. I'll call back with a specific proposal.",
                        phone: "Phone",
                        email: "Email",
                        send: "SEND MESSAGE"
                    },
                    footer: {
                        rights: "All rights reserved."
                    }
                }
            }
        }
    });

export default i18n;
