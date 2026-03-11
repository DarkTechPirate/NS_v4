import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from './Sidebar';
import DashboardWidgets from './DashboardWidgets';

const Dashboard = () => {
    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Navbar for Mobile (or general wrapper) - dashboard usually has specific needs but reuse for now */}
            <div className="md:hidden">
                <Navbar />
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
                    <div className="max-w-6xl mx-auto">
                        <header className="flex justify-between items-end mb-10">
                            <div>
                                <h1 className="text-3xl font-serif text-lux-navy mb-2">Welcome back, Alexandra</h1>
                                <p className="text-lux-pale/60 text-sm">Wedding Date: June 12, 2025</p>
                            </div>
                            <button className="bg-lux-navy text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-gold transition-colors shadow-lg">
                                + New Inquiry
                            </button>
                        </header>

                        <DashboardWidgets />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
