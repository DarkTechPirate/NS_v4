import React from 'react';

const StepPackage = ({ selectedPackage, setSelectedPackage }) => {
    const packages = [
        {
            id: 1,
            name: 'The Editorial Collection',
            price: '$6,500',
            description: 'PERFECT FOR: Intimate celebrations focusing on high-impact imagery.',
            features: ['10 Hours Coverage', 'Two Photographers', 'Online Gallery', 'Fine Art Album']
        },
        {
            id: 2,
            name: 'The Weekender',
            price: '$12,000',
            description: 'PERFECT FOR: Multi-day events capturing the full narrative.',
            features: ['All Day Coverage', 'Rehearsal Dinner', 'Brunch (Next Day)', 'Drone Cinematography'],
            featured: true
        },
        {
            id: 3,
            name: 'The Bespoke Experience',
            price: '$18,000+',
            description: 'PERFECT FOR: Destination weddings requiring extensive travel & specialized team.',
            features: ['Unlimited Coverage', '3-Day Event', 'Cinema Team Included', 'Same-Day Edit']
        }
    ];

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-serif text-lux-navy mb-6">Select Your Collection</h2>
            <div className="space-y-4">
                {packages.map(pkg => (
                    <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`border rounded-lg p-6 transition-all hover:shadow-lg cursor-pointer ${selectedPackage?.id === pkg.id
                                ? 'border-lux-gold bg-lux-gold/5 ring-1 ring-lux-gold'
                                : 'border-lux-gold/20 hover:border-lux-gold/50'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-serif text-xl text-lux-navy">{pkg.name}</h4>
                                {pkg.featured && <span className="text-[10px] text-lux-gold font-bold uppercase tracking-widest">Recommended</span>}
                            </div>
                            <span className="font-medium text-lg text-lux-navy">{pkg.price}</span>
                        </div>
                        <p className="text-sm text-lux-pale/60 italic mb-4">{pkg.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-lux-navy/70">
                                    <span className="material-symbols-outlined text-lux-gold text-xs">check_circle</span>
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepPackage;
