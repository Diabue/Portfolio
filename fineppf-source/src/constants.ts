import type { ProductCategory, GalleryImage } from './types';
import photo1 from './assets/photo1.PNG';
import photo2 from './assets/photo2.PNG';
import photo3 from './assets/photo3.PNG';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        id: 1,
        name: "ULTIMATE CLEAR",
        tagline: "Niewidzialna ochrona",
        icon: "Shield",
        image: photo1,
        description: [
            "WYSOKI POŁYSK",
            "+",
            "SAMOREGENERACJA",
            "+",
            "HYDROFOBOWOŚĆ",
            "+",
            "ODPORNOŚĆ NA CHEMIĘ"
        ]
    },
    {
        id: 2,
        name: "MATTE & SATIN",
        tagline: "Nowoczesny design",
        icon: "Sparkles",
        image: photo2,
        highlight: true,
        description: [
            "GŁĘBOKI MAT",
            "+",
            "SATYNOWE WYKOŃCZENIE",
            "+",
            "OCHRONA LAKIERU MATOWEGO",
            "+",
            "UNIKALNY WYGLĄD"
        ]
    },
    {
        id: 3,
        name: "COLOR PPF",
        tagline: "Zmiana koloru i ochrona",
        icon: "Pallete",
        image: photo3,
        description: [
            "GŁĘBOKIE KOLORY",
            "+",
            "GRUBOŚĆ PPF",
            "+",
            "BRAK EFEKTU SKÓRKI POMARAŃCZY",
            "+",
            "TRWAŁOŚĆ DO 10 LAT"
        ]
    },
    {
        id: 4,
        name: "SPECIALTY SERIES",
        tagline: "Detale i efekty",
        icon: "Monitor",
        image: photo1,
        description: [
            "FORTEPIANOWA CZERŃ (PIANO BLACK)",
            "+",
            "PPF CARBON (2D/3D)",
            "+",
            "PRZYCIEMNIANIE LAMP",
            "+",
            "OCHRONA WNĘTRZA"
        ]
    }
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800", alt: "Aplikacja PPF" },
    { id: 2, url: "https://images.unsplash.com/photo-1605556209501-1b606f157de3?auto=format&fit=crop&q=80&w=800", alt: "Folia ochronna" },
    { id: 3, url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", alt: "Detailing" },
    { id: 4, url: "https://images.unsplash.com/photo-1600713794611-306c55ccafb5?auto=format&fit=crop&q=80&w=800", alt: "Ochrona Porsche" }
];

export const PHONE_NUMBER = "+48 000 000 000";
export const ADDRESS = "ul. Przykładowa 12, 00-000 Warszawa";
export const GOOGLE_MAPS_URL = "https://maps.google.com";
