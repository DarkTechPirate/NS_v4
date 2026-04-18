import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVendors } from '../../services/vendorService';
import { getAllVenues } from '../../services/venueService';

const VendorGrid = ({ type = 'vendors' }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = type === 'venues' ? await getAllVenues() : await getAllVendors();
                if (res.success) setItems(res.data);
            } catch (err) {
                console.error(`Failed to fetch ${type}`, err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [type]);

    return (
        <main className="flex-1 p-6 lg:p-10 flex flex-col gap-8">
            {/* Page Header & Search */}
            <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end border-b border-lux-gold/10 pb-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-light text-lux-pale tracking-tight mb-3">
                        Discover Your <span className="text-lux-gold font-normal italic">Wedding Team</span>
                    </h1>
                    <p className="text-lux-pale/60 text-lg font-light leading-relaxed">
                        Handpicked artisans for the discerning couple. Browse our curated selection of verified premium vendors.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-[320px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-lux-pale/40">search</span>
                        </div>
                        <input type="text" placeholder="Search for artisans or styles..." className="block w-full h-12 pl-10 pr-3 bg-lux-navy-light border border-lux-gold/10 rounded-lg leading-5 text-lux-pale placeholder-lux-pale/30 focus:outline-none focus:bg-lux-navy-light focus:border-lux-gold transition-colors sm:text-sm" />
                    </div>
                    {/* Sort Dropdown */}
                    <div className="relative min-w-[180px]">
                        <select className="block w-full h-12 pl-3 pr-10 py-2 text-base border-lux-gold/10 bg-lux-navy-light text-lux-pale rounded-lg focus:outline-none focus:border-lux-gold sm:text-sm appearance-none cursor-pointer">
                            <option>Recommended</option>
                            <option>Price: High to Low</option>
                            <option>Price: Low to High</option>
                            <option>Rating: Highest</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lux-pale/60">
                            <span className="material-symbols-outlined">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2">
                {['Fine Art Photography', 'Destination Weddings', 'Vintage Aesthetic', 'Eco-Luxury'].map(tag => (
                    <button key={tag} className="px-4 py-1.5 rounded-full border border-lux-pale/10 bg-lux-navy-light text-lux-pale/70 text-xs font-medium hover:border-lux-gold/30 hover:text-lux-gold transition-all">
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20 text-lux-pale/60">Loading {type}...</div>
            ) : items.length === 0 ? (
                <div className="flex justify-center items-center py-20 text-lux-pale/60">No {type} found. Start by assigning some.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <Link to={`/${type}/${item._id}`} key={item._id} className="group flex flex-col gap-4 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-lux-rough">
                                <img src={item.coverImage || item.images?.[0] || 'https://images.unsplash.com/photo-1562699312-8441050eef0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={item.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                                {/* Hover Overlay Border */}
                                <div className="absolute inset-0 border-[1px] border-lux-gold/0 group-hover:border-lux-gold/100 transition-all duration-500 rounded-lg pointer-events-none z-10"></div>
                                {/* Hover Button */}
                                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    <button className="w-full bg-lux-navy/80 backdrop-blur text-lux-pale hover:bg-lux-gold hover:text-white text-sm font-semibold py-3 rounded border border-lux-pale/10 shadow-lg transition-colors">View {type === 'venues' ? 'Gallery' : 'Portfolio'}</button>
                                </div>
                                {/* Badge */}
                                {item.verified && (
                                    <div className="absolute top-4 right-4 bg-lux-gold/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-md">Verified</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lux-pale text-xl font-medium group-hover:text-lux-gold transition-colors">{item.name}</h3>
                                    <div className="flex items-center gap-1 text-lux-gold">
                                        <span className="text-sm font-bold">{item.rating || 'New'}</span>
                                        <span className="material-symbols-outlined text-[16px] overflow-hidden" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                </div>
                                <p className="text-lux-pale/50 text-sm font-light">{item.location}</p>
                                <div className="flex items-center justify-between mt-2 pt-3 border-t border-lux-pale/5">
                                    <span className="text-xs text-lux-pale/40 uppercase tracking-widest">{type === 'venues' ? 'Venue' : item.category}</span>
                                    <span className="text-sm text-lux-pale font-medium">{item.priceRate || item.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination / Load More */}
            <div className="flex justify-center mt-12 mb-8">
                <button className="group relative px-2 py-1">
                    <span className="text-lux-pale font-medium text-lg tracking-wide group-hover:text-lux-gold transition-colors">Load More Artisans</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-lux-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
            </div>

            <footer className="mt-auto border-t border-lux-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-lux-pale/40">
                <p>© 2024 LuxeMatrimony. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-lux-gold transition-colors">Privacy</a>
                    <a href="#" className="hover:text-lux-gold transition-colors">Terms</a>
                    <a href="#" className="hover:text-lux-gold transition-colors">Contact</a>
                </div>
            </footer>
        </main>
    );
};

export default VendorGrid;
