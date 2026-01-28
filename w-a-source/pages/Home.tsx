import React from 'react';
import Hero from '../components/Hero';
import SocialSection from '../components/SocialSection';
import Packages from '../components/Packages';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <SocialSection />
            <Packages />
            <Gallery />
            <Contact />
        </main>
    );
};

export default Home;
