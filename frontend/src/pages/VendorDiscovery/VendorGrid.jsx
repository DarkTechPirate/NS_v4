import React from 'react';
import { Link } from 'react-router-dom';

const VENDORS = [
    {
        id: 1,
        name: 'Aurum Floral Studio',
        category: 'Floral Design',
        price: 'From $8,000',
        location: 'Lake Como, Italy',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1562699312-8441050eef0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        delay: '0.1s'
    },
    {
        id: 2,
        name: 'Elysian Events',
        category: 'Full Planning',
        price: 'From $12,000',
        location: 'Paris, France',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: false,
        delay: '0.2s'
    },
    {
        id: 3,
        name: 'Lumière Photography',
        category: 'Fine Art Photo',
        price: 'From $6,500',
        location: 'New York, USA',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1533158388470-9a216a5dbe80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        delay: '0.3s'
    },
    {
        id: 4,
        name: 'Maison de Goût',
        category: 'Catering',
        price: 'From $250/pp',
        location: 'Lyon, France',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: false,
        delay: '0.4s'
    },
    {
        id: 5,
        name: 'The Grand Estate',
        category: 'Venue',
        price: 'From $20,000',
        location: 'Tuscany, Italy',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1519225468359-2996515c9dc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: true,
        delay: '0.5s'
    },
    {
        id: 6,
        name: 'Velvet & Vine',
        category: 'Stationery',
        price: 'From $2,000',
        location: 'London, UK',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1586942398572-c5188f615456?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        verified: false,
        delay: '0.6s'
    }
];

const VendorGrid = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {VENDORS.map((vendor, index) => (
                    <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="group flex flex-col gap-4 cursor-pointer animate-fade-in-up" style={{ animationDelay: vendor.delay }}>
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-lux-rough">
                            <img src={vendor.image} alt={vendor.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                            {/* Hover Overlay Border */}
                            <div className="absolute inset-0 border-[1px] border-lux-gold/0 group-hover:border-lux-gold/100 transition-all duration-500 rounded-lg pointer-events-none z-10"></div>
                            {/* Hover Button */}
                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                <button className="w-full bg-lux-navy/80 backdrop-blur text-lux-pale hover:bg-lux-gold hover:text-white text-sm font-semibold py-3 rounded border border-lux-pale/10 shadow-lg transition-colors">View Portfolio</button>
                            </div>
                            {/* Badge */}
                            {vendor.verified && (
                                <div className="absolute top-4 right-4 bg-lux-gold/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-md">Verified</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lux-pale text-xl font-medium group-hover:text-lux-gold transition-colors">{vendor.name}</h3>
                                <div className="flex items-center gap-1 text-lux-gold">
                                    <span className="text-sm font-bold">{vendor.rating}</span>
                                    <span className="material-symbols-outlined text-[16px] overflow-hidden" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                            </div>
                            <p className="text-lux-pale/50 text-sm font-light">{vendor.location}</p>
                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-lux-pale/5">
                                <span className="text-xs text-lux-pale/40 uppercase tracking-widest">{vendor.category}</span>
                                <span className="text-sm text-lux-pale font-medium">{vendor.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

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
