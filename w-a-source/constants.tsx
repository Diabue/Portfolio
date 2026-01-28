import React from 'react';
import { ServicePackage, GalleryImage } from './types';

export const PACKAGES: ServicePackage[] = [
  {
    id: 1,
    name: "PODSTAWOWY",
    price: "250 zł",
    icon: "Waves",
    description: [
      "MYCIE (piana, metoda 2 wiadra, wnęki, felgi, wosk na mokro)",
      "+",
      "ODŚWIEŻENIE WNĘTRZA (odkurzanie, plastiki, szyby)"
    ]
  },
  {
    id: 2,
    name: "COMPLEX",
    price: "400 zł",
    icon: "Car",
    description: [
      "MYCIE detailingowe/dekontaminacja",
      "+",
      "DETAILING WNĘTRZA"
    ]
  },
  {
    id: 3,
    name: "WNĘTRZE JAK Z SALONU",
    price: "750 zł",
    icon: "Sparkles",
    description: [
      "PEŁNY DETAILING wnętrza",
      "+",
      "CZYSZCZENIE z impregnacją skóry lub PRANIE tapicerki materiałowej",
      "+",
      "OZONOWANIE",
      "+",
      "MYCIE ZEWNĘTRZNE"
    ]
  },
  {
    id: 4,
    name: "SHINE",
    price: "650 zł",
    icon: "Zap",
    description: [
      "MYCIE detailingowe/dekontaminacja",
      "+",
      "TWARDY WOSK",
      "+",
      "DETAILING WNĘTRZA"
    ]
  },
  {
    id: 5,
    name: "SHINE +",
    price: "1300 zł",
    icon: "Star",
    highlight: true,
    description: [
      "MYCIE detailingowe/dekontaminacja",
      "+",
      "KOREKTA LAKIERU one step",
      "+",
      "TWARDY WOSK",
      "+",
      "DETAILING WNĘTRZA"
    ]
  },
  {
    id: 6,
    name: "PREMIUM",
    price: "2700 zł",
    icon: "Shield",
    description: [
      "MYCIE detailingowe/dekontaminacja",
      "+",
      "KOREKTA LAKIERU one step",
      "+",
      "POWŁOKA CERAMICZNA 3-letnia",
      "+",
      "DETAILING WNĘTRZA",
      "+",
      "OZONOWANIE"
    ]
  }
];


import g2 from './assets/g2.png';
import g3 from './assets/g3.png';
import g4 from './assets/g4.png';
import g5 from './assets/g5.png';
import g7 from './assets/g7.png';
import g8 from './assets/g8.png';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: g7,
    alt: "Korekta lakieru Porsche"
  },
  {
    id: 2,
    url: g5,
    alt: "Mycie detailingowe"
  },
  {
    id: 3,
    url: g8,
    alt: "Wnętrze Premium"
  },
  {
    id: 4,
    url: g4,
    alt: "Zabezpieczenie lakieru"
  },
  {
    id: 5,
    url: g2,
    alt: "Proces pielęgnacji"
  },
  {
    id: 6,
    url: g3,
    alt: "Efekt końcowy"
  },
];

export const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/W%26A+Detailing+-+Pow%C5%82oki+Ceramiczne%2F+Elastomerowe%2F+Grafenowe/@52.2858738,16.8507052,17.5z/data=!4m6!3m5!1s0x470451ea1d0c9d77:0x7ecb219f50f75351!8m2!3d52.2870086!4d16.8524417!16s%2Fg%2F11pc50gnbf";
export const PHONE_NUMBER = "+48 692 009 777";
export const ADDRESS = "Księdza Ignacego Posadzego 5A, 62-040 Puszczykowo";
