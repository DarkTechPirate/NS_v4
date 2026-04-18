import React from 'react';
import VendorGrid from '../VendorDiscovery/VendorGrid'; // Reuse for now or create generic
import SidebarFilter from '../VendorDiscovery/SidebarFilter';

const Venues = () => {
    return (
        <div className="bg-lux-navy text-lux-pale font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-lux-gold selection:text-white">
            <div className="pt-10 px-6 pb-4 border-b border-white/5 bg-off-navy">
                <h1 className="text-4xl font-serif text-pale mb-2">Exclusive Venues</h1>
                <p className="text-gray-400">Find the perfect setting for your timeless celebration.</p>
            </div>
            <div className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row pt-8">
                <SidebarFilter />
                <VendorGrid type="venues" />
            </div>
        </div>
    );
};

export default Venues;
