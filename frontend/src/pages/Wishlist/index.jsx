import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import { getWishlist, removeFromWishlist } from '../../services/wishlistService';
import { useAuth } from '../../context/AuthContext';
import { getDashboardData } from '../../services/profileService';
import { getImageUrl } from '../../utils/imageUtils';

const Wishlist = () => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [wishRes, dashRes] = await Promise.all([
                    getWishlist(),
                    getDashboardData().catch(() => null)
                ]);
                setWishlist(wishRes || []);
                if (dashRes?.success) setDashboardData(dashRes.dashboard);
            } catch (err) {
                console.error("Failed to load wishlist");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRemove = async (providerId) => {
        try {
            await removeFromWishlist(providerId);
            setWishlist(wishlist.filter(item => item.provider?._id !== providerId));
        } catch (err) {
            console.error("Failed to remove from wishlist");
        }
    };

    return (
        <div className="bg-background-light min-h-screen font-display">
            <div className="flex">
                <Sidebar user={user} data={dashboardData} loading={loading} />
                <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-10 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-serif text-lux-navy mb-2">My Wishlist</h1>
                                <p className="text-lux-pale/60 text-sm">Save your favorite vendors and venues</p>
                            </div>
                        </header>

                        {loading ? (
                            <div className="flex justify-center p-20 text-lux-gold"><span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span></div>
                        ) : wishlist.length === 0 ? (
                            <div className="bg-white border border-lux-gold/10 rounded-lg p-12 text-center shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-lux-pale/40 mb-4 block">favorite_border</span>
                                <h2 className="text-xl font-serif text-lux-navy mb-2">Your wishlist is empty</h2>
                                <p className="text-lux-navy/50 text-sm mb-6">Discover amazing vendors and save them here for later.</p>
                                <Link to="/vendors" className="bg-lux-navy text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-gold transition-colors inline-block">
                                    Explore Vendors
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {wishlist.map((item) => {
                                    if (!item.provider) return null;
                                    const provider = item.provider;
                                    return (
                                        <div key={item._id} className="bg-white rounded-lg overflow-hidden border border-lux-gold/20 shadow-sm hover:shadow-lg transition-shadow group">
                                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                                <img 
                                                    src={getImageUrl(provider.coverImage || (provider.images && provider.images[0]))} 
                                                    alt={provider.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-lux-navy shadow-sm">
                                                        {item.providerModel}
                                                    </span>
                                                    <button onClick={() => handleRemove(provider._id)} className="w-8 h-8 rounded bg-white/90 backdrop-blur-sm flex items-center justify-center text-lux-gold hover:bg-lux-gold hover:text-white transition-colors shadow-sm" title="Remove from wishlist">
                                                        <span className="material-symbols-outlined text-sm">close</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-serif text-xl text-lux-navy">{provider.name}</h3>
                                                    <div className="flex items-center gap-1 text-lux-gold bg-lux-gold/10 px-2 py-0.5 rounded text-xs font-medium">
                                                        <span className="material-symbols-outlined text-[14px]">star</span>
                                                        {provider.rating?.toFixed(1) || 'NEW'}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-lux-navy/50 flex items-center gap-1 mb-4 uppercase tracking-wider font-medium">
                                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                    {provider.location}
                                                </p>
                                                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                                                    <p className="text-sm font-medium text-lux-navy">{provider.priceRate}</p>
                                                    <Link to={`/${item.providerModel === 'Venue' ? 'venues' : 'vendors'}/${provider._id}`} className="text-xs font-bold uppercase tracking-widest text-lux-gold hover:text-lux-navy transition-colors">
                                                        View Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Wishlist;
