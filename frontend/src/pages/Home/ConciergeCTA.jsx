import React from 'react';

const ConciergeCTA = () => {
    return (
        <section className="py-32 bg-rough relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-serif text-white mb-4">The Concierge Service</h2>
                    <p className="text-pale/70 text-lg font-light leading-relaxed">
                        For those who demand the exceptional. Our dedicated concierge team manages every detail of your vendor selection process, ensuring a seamless journey to the altar.
                    </p>
                </div>
                <div className="shrink-0">
                    <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-sm hover:bg-white hover:text-background-dark transition-all duration-300 group">
                        <span className="font-bold tracking-widest uppercase text-sm flex items-center gap-3">
                            Talk to a Concierge
                            <span className="material-symbols-outlined transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">north_east</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConciergeCTA;
