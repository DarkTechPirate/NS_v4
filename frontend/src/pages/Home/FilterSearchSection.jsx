import React from 'react';

const FilterSearchSection = () => {
    return (
        <section className="relative z-30 -mt-24 px-4 pb-20">
            <div className="max-w-6xl mx-auto bg-[#0a1245]/90 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-serif text-white mb-8 italic">Design your perfect celebration</h2>
                    <div className="w-full flex flex-wrap justify-center items-end gap-4 md:gap-6 text-lg md:text-2xl text-pale font-light leading-loose">
                        <span className="py-2">I am looking for a</span>
                        <div className="relative inline-block min-w-[200px] border-b border-primary/50 hover:border-primary transition-colors">
                            <select className="w-full bg-transparent border-none focus:ring-0 text-primary font-serif italic cursor-pointer appearance-none py-2 pr-8 pl-2 outline-none">
                                <option className="bg-background-dark text-pale">Photographer</option>
                                <option className="bg-background-dark text-pale">Venue</option>
                                <option className="bg-background-dark text-pale">Planner</option>
                                <option className="bg-background-dark text-pale">Florist</option>
                            </select>
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-primary text-sm">expand_more</span>
                        </div>
                        <span className="py-2">in</span>
                        <div className="relative inline-block min-w-[200px] border-b border-primary/50 hover:border-primary transition-colors">
                            <select className="w-full bg-transparent border-none focus:ring-0 text-primary font-serif italic cursor-pointer appearance-none py-2 pr-8 pl-2 outline-none">
                                <option className="bg-background-dark text-pale">Lake Como, Italy</option>
                                <option className="bg-background-dark text-pale">Paris, France</option>
                                <option className="bg-background-dark text-pale">Kyoto, Japan</option>
                                <option className="bg-background-dark text-pale">New York, USA</option>
                            </select>
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-primary text-sm">expand_more</span>
                        </div>
                        <span className="py-2">for</span>
                        <div className="relative inline-block min-w-[150px] border-b border-primary/50 hover:border-primary transition-colors">
                            <select className="w-full bg-transparent border-none focus:ring-0 text-primary font-serif italic cursor-pointer appearance-none py-2 pr-8 pl-2 outline-none">
                                <option className="bg-background-dark text-pale">Summer 2024</option>
                                <option className="bg-background-dark text-pale">Fall 2024</option>
                                <option className="bg-background-dark text-pale">Winter 2024</option>
                                <option className="bg-background-dark text-pale">Spring 2025</option>
                            </select>
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-primary text-sm">expand_more</span>
                        </div>
                        <button className="ml-4 p-3 bg-primary rounded-full hover:bg-white hover:text-primary text-white transition-all duration-300 flex items-center justify-center">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {['Cinematic Video', 'Haute Couture', 'Castle Venues', 'Michelin Catering'].map(tag => (
                        <span key={tag} className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-wider hover:bg-primary/20 hover:border-primary/50 transition-all cursor-pointer text-pale/70">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FilterSearchSection;
