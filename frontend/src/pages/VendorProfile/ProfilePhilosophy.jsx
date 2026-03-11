import React from 'react';

const ProfilePhilosophy = () => {
    return (
        <section className="py-24 bg-lux-navy border-b border-lux-gold/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="text-lux-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 block">The Narrative</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-8">
                    "We don't just capture moments; we bottle the <span className="text-lux-gold italic">atmosphere</span>."
                </h2>
                <div className="flex flex-col gap-6 text-lux-pale/70 text-lg font-light leading-relaxed">
                    <p>
                        For over a decade, Lumière Photography has been documenting the world's most exclusive celebrations. Our philosophy is rooted in the belief that true luxury lies in the unseen—the stolen glances, the quiet pauses, the way the light catches a veil.
                    </p>
                    <p>
                        We blend high-fashion editorial aesthetics with candid photojournalism to create a visual legacy that feels both timeless and aggressively modern.
                    </p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1550974797-0f2382c42bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Signature"
                    className="mx-auto mt-12 bg-white/10 p-2 rounded-full w-24 h-24 object-contain opacity-80"
                />
            </div>
        </section>
    );
};

export default ProfilePhilosophy;
