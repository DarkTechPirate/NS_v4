import React from 'react';
import SidebarFilter from './SidebarFilter';
import VendorGrid from './VendorGrid';

const VendorDiscovery = () => {
    return (
        <div className="bg-lux-navy text-lux-pale font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-lux-gold selection:text-white">
            <div className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row pt-8">
                <SidebarFilter />
                <VendorGrid />
            </div>
        </div>
    );
};

export default VendorDiscovery;
