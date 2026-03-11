import React from 'react';

const Stories = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif text-primary mb-8 ml-6">Real Weddings, Real Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white dark:bg-off-navy-light rounded-lg shadow-lg overflow-hidden border border-primary/10">
                        <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center text-primary/30">
                            {/* Placeholder for story image */}
                            <span className="material-symbols-outlined text-6xl">image</span>
                        </div>
                        <div className="p-6">
                            <span className="text-primary text-xs tracking-widest uppercase font-bold mb-2 block">Romantic</span>
                            <h3 className="text-xl text-off-navy dark:text-pale font-serif mb-3">Sarah & Michael's Tuscany Dream</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                A beautiful sunset ceremony overlooking the vineyards, followed by an intimate reception under the stars.
                            </p>
                            <button className="text-primary text-sm font-bold uppercase tracking-widest hover:text-primary-hover transition-colors">
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stories;
