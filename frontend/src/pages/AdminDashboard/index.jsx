import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPlatformStats, getAllProvidersAdmin, verifyProvider } from '../../services/adminService';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const statRes = await getPlatformStats();
                if (statRes.success) setStats(statRes.data);

                const provRes = await getAllProvidersAdmin();
                if (provRes.success) setProviders(provRes.data);
            } catch (err) {
                console.error("Admin dashboard fetch error", err);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchAdminData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleVerify = async (id, type) => {
        try {
            const res = await verifyProvider(id, type);
            if (res.success) {
                setProviders(providers.map(p => p._id === id ? { ...p, verified: true } : p));
            }
        } catch (err) {
            alert("Verification failed");
        }
    };

    if (!user || user.role !== 'admin') {
        return <div className="min-h-screen pt-32 text-center text-lux-pale">Access Denied. Admins only.</div>;
    }

    if (loading) {
        return <div className="min-h-screen pt-32 text-center text-lux-pale">Loading Admin System...</div>;
    }

    return (
        <div className="bg-background-light min-h-screen font-display pb-20 pt-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 border-b border-lux-gold/10 pb-6">
                    <h1 className="text-4xl font-serif text-lux-navy mb-2">Platform Administration</h1>
                    <p className="text-sm text-lux-navy/60">Overview and Management</p>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                        <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Total Users</p>
                        <p className="text-4xl font-serif text-lux-navy">{stats?.users || 0}</p>
                    </div>
                    <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                        <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Providers</p>
                        <p className="text-4xl font-serif text-lux-navy">{stats?.providers || 0}</p>
                    </div>
                    <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                        <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Total Bookings</p>
                        <p className="text-4xl font-serif text-lux-navy">{stats?.bookings || 0}</p>
                    </div>
                    <div className="bg-lux-gold border border-lux-gold p-6 rounded-lg shadow-sm text-white">
                        <p className="text-xs uppercase tracking-widest text-white/80 mb-2">Pending Bookings</p>
                        <p className="text-4xl font-serif">{stats?.pendingBookings || 0}</p>
                    </div>
                </div>

                {/* Provider Verification Table */}
                <div className="bg-white rounded-lg shadow-sm border border-lux-gold/10 overflow-hidden">
                    <div className="p-6 border-b border-lux-gold/5 bg-lux-navy-light/5 text-lux-navy font-serif text-2xl">
                        Manage Providers
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-lux-navy/80">
                            <thead className="text-xs uppercase bg-background-light font-bold">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Type / Category</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Owner Email</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {providers.map(p => (
                                    <tr key={p._id} className="border-b border-lux-gold/5 hover:bg-lux-gold/5">
                                        <td className="px-6 py-4 font-medium text-lux-navy">{p.name}</td>
                                        <td className="px-6 py-4">{p.type} <span className="opacity-50">/ {p.category}</span></td>
                                        <td className="px-6 py-4">{p.location}</td>
                                        <td className="px-6 py-4">{p.ownerEmail || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            {p.verified ? (
                                                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded">Verified</span>
                                            ) : (
                                                <span className="text-yellow-600 font-bold uppercase text-[10px] tracking-widest bg-yellow-50 px-2 py-1 rounded">Unverified</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {!p.verified && (
                                                <button onClick={() => handleVerify(p._id, p.type)} className="text-lux-gold hover:text-lux-navy font-bold uppercase text-xs tracking-widest">
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
