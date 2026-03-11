import React from 'react';

const ProfileAvailability = () => {
    return (
        <section className="py-24 bg-lux-navy border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-3xl font-serif text-white mb-8">Availability</h3>
                <p className="text-lux-pale/60 text-lg font-light mb-12">
                    Lumière Photography accepts a limited number of commissions per year to ensure the highest level of artistry and service.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Summer 2024', 'Fall 2024', 'Spring 2025'].map(season => (
                        <div key={season} className="bg-lux-navy-light border border-lux-gold/20 p-6 rounded-sm">
                            <h4 className="text-white font-serif text-xl mb-2">{season}</h4>
                            <p className="text-lux-gold text-sm font-bold uppercase tracking-widest">Limited Availability</p>
                            <div className="mt-4 w-full bg-lux-rough/20 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-lux-gold h-full w-[20%]"></div>
                            </div>
                            <p className="text-xs text-lux-pale/40 mt-2 text-right">2 spots left</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfileAvailability;
