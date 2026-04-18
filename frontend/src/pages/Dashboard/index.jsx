import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from './Sidebar';
import DashboardWidgets from './DashboardWidgets';
import { getDashboardData } from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDash = async () => {
            try {
                const res = await getDashboardData();
                if (res.success) setDashboardData(res.dashboard);
            } catch (err) {
                console.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchDash();
    }, []);
    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Navbar for Mobile (or general wrapper) - dashboard usually has specific needs but reuse for now */}
            <div className="md:hidden">
                <Navbar />
            </div>

            <div className="flex">
                <Sidebar user={user} data={dashboardData} loading={loading} />
                <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
                    <div className="max-w-6xl mx-auto">
                        <header className="flex justify-between items-end mb-10">
                            <div>
                                <h1 className="text-3xl font-serif text-lux-navy mb-2">Welcome back, {user?.fullname?.split(' ')[0] || 'User'}</h1>
                                <p className="text-lux-pale/60 text-sm">
                                    Wedding Date: {dashboardData?.weddingDate ? new Date(dashboardData.weddingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : 'Not set'}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Link to="/messages" className="bg-white text-lux-navy border border-lux-navy px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors shadow">
                                    Messages
                                </Link>
                                <button className="bg-lux-navy text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-gold transition-colors shadow-lg">
                                    + New Inquiry
                                </button>
                            </div>
                        </header>

                        <DashboardWidgets data={dashboardData} loading={loading} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
