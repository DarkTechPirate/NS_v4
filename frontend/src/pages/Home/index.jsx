import React from 'react';
import HeroSection from './HeroSection';
import FilterSearchSection from './FilterSearchSection';
import EditorialSection from './EditorialSection';
import VendorGridSection from './VendorGridSection';
import TestimonialSection from './TestimonialSection';
import ConciergeCTA from './ConciergeCTA';

const Home = () => {
    return (
        <div className="bg-background-dark min-h-screen">
            <main>
                <HeroSection />
                <FilterSearchSection />
                <EditorialSection />
                <VendorGridSection />
                <TestimonialSection />
                <ConciergeCTA />
            </main>
        </div>
    );
};

export default Home;
