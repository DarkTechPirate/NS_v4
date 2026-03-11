import React from 'react';

const PACKAGES = [
    {
        name: 'The Editorial Collection',
        price: 'Start at $6,500',
        includes: ['10 Hours Coverage', 'Two Photographers', 'Online Gallery', 'Fine Art Album'],
        featured: true
    },
    {
        name: 'The Weekender',
        price: 'Start at $12,000',
        includes: ['All Day Coverage', 'Rehearsal Dinner', 'Brunch (Next Day)', 'Drone Cinematography'],
        featured: false
    }
];

const ProfileServices = () => {
    return (
        <section className="py-24 bg-background-dark">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h3 className="text-3xl font-serif text-white mb-8">Curated Collections</h3>
                    <p className="text-lux-pale/60 text-lg font-light mb-12">
                        We offer bespoke collections tailored to the unique cadence of your celebration.
                    </p>
                </div>
                <div className="space-y-6">
                    {PACKAGES.map((pkg, i) => (
                        <div key={i} className={`p-8 border ${pkg.featured ? 'border-lux-gold bg-lux-gold/5' : 'border-white/10 bg-white/5'} rounded-sm hover:bg-lux-gold/10 transition-colors cursor-pointer`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xl font-serif text-white">{pkg.name}</h4>
                                    {pkg.featured && <span className="text-[10px] text-lux-gold font-bold uppercase tracking-widest mt-1 block">Most Popular</span>}
                                </div>
                                <span className="text-lg font-light text-lux-pale">{pkg.price}</span>
                            </div>
                            <ul className="space-y-2">
                                {pkg.includes.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-lux-pale/70 text-sm">
                                        <span className="material-symbols-outlined text-lux-gold text-sm">check</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfileServices;
