import React from 'react';
import { Link } from 'react-router-dom';

const ARTISANS = [
    {
        id: 1,
        category: 'Haute Couture',
        name: 'Elianna Moore',
        description: 'Bespoke bridal gowns from Milan.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        delay: '0.1s'
    },
    {
        id: 2,
        category: 'Patisserie',
        name: 'Sweet Artistry',
        description: 'Sculptural cakes for the modern couple.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        delay: '0.2s',
        className: 'lg:mt-16'
    },
    {
        id: 3,
        category: 'Venue Styling',
        name: 'Lumina Events',
        description: 'Transforming spaces into dreams.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        delay: '0.3s'
    }
];

const VendorGridSection = () => {
    return (
        <section className="py-32 bg-rough/10 relative">
            <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Curated Artisans</h2>
                    <p className="text-pale/60 text-lg font-light max-w-lg">Hand-picked professionals who understand the nuance of luxury.</p>
                </div>
                <Link to="/vendors" className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-background-dark transition-all duration-300 rounded-sm uppercase text-xs tracking-widest">
                    View All Vendors
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ARTISANS.map((artisan, index) => (
                    <div
                        key={artisan.id}
                        className={`group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-sm ${artisan.className || ''}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60 z-10"></div>
                        <img
                            alt={artisan.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={artisan.image}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{artisan.category}</span>
                            <h3 className="text-white text-2xl font-serif mb-1">{artisan.name}</h3>
                            <p className="text-pale/60 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {artisan.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VendorGridSection;
