import React from 'react';
import Hero from '../components/Hero';
import DlaczegoMy from '../components/DlaczegoMy';
import Products from '../components/Products';
import Gallery from '../components/Gallery';
import SocialSection from '../components/SocialSection';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <DlaczegoMy />
            <Products />
            <Gallery />
            <SocialSection />
            <Contact />
        </main>
    );
};

export default Home;
