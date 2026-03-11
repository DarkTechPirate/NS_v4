import React from 'react';

const ProfileHero = () => {
    return (
        <section className="relative h-[70vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-lux-navy via-transparent to-transparent z-10"></div>
            <img
                src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Lumiere Photography Hero"
                className="w-full h-full object-cover animate-ken-burns"
            />

            <div className="absolute bottom-0 left-0 w-full z-20 p-8 md:p-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-lux-gold text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Verified Artisan</span>
                            <span className="text-lux-pale/80 text-xs font-medium tracking-wide">Based in Paris & New York</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-2">Lumière Photography</h1>
                        <div className="flex items-center gap-4 text-lux-gold text-sm">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                            </div>
                            <span className="text-lux-pale/60">(128 Reviews)</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-lux-navy px-6 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-pale transition-colors">Save to Wishlist</button>
                        <button className="border border-white/30 text-white px-6 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-lux-navy transition-colors">Share</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileHero;
