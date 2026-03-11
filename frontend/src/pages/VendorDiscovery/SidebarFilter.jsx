import React from 'react';

const SidebarFilter = () => {
    return (
        <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-lux-gold/10 bg-lux-navy p-6 lg:p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lux-pale text-lg font-bold tracking-wide">Filters</h3>
                <button className="text-lux-gold text-xs font-medium hover:text-white uppercase tracking-wider transition-colors">Reset</button>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div className="group border-b border-lux-gold/10 pb-6">
                    <p className="text-lux-pale font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Category</p>
                    <div className="space-y-3">
                        {['Venues', 'Photographers', 'Florists', 'Couture'].map((cat, idx) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group/item">
                                <input type="checkbox" defaultChecked={idx === 1} className="size-4 rounded border-lux-gold/40 bg-lux-navy-light text-lux-gold focus:ring-1 focus:ring-lux-gold focus:ring-offset-0 transition-colors" />
                                <span className="text-lux-pale/70 text-sm group-hover/item:text-lux-pale transition-colors">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Location Filter */}
                <div className="border-b border-lux-gold/10 pb-6">
                    <p className="text-lux-pale font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Location</p>
                    <div className="relative">
                        <input type="text" placeholder="Enter City or Country" className="w-full h-10 rounded bg-lux-navy-light border border-lux-gold/20 text-lux-pale placeholder:text-lux-pale/30 text-sm px-3 focus:border-lux-gold focus:ring-0 transition-colors" />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-lux-gold/50 text-[18px]">location_on</span>
                    </div>
                </div>

                {/* Budget Range */}
                <div className="border-b border-lux-gold/10 pb-6">
                    <p className="text-lux-pale font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Budget Range</p>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-lux-pale/60">$</span>
                        <div className="flex-1 h-1 bg-lux-rough rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-lux-gold rounded-full ml-4"></div>
                        </div>
                        <span className="text-xs text-lux-pale/60">$$$$$</span>
                    </div>
                    <div className="flex justify-between text-xs text-lux-pale/50 font-medium">
                        <span>Premium</span>
                        <span>Ultra-Luxury</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="pb-2">
                    <p className="text-lux-pale font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Rating</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group/item">
                            <input type="radio" name="rating" className="size-4 border-lux-gold/40 bg-lux-navy-light text-lux-gold focus:ring-0 transition-colors" />
                            <div className="flex text-lux-gold">
                                {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-[16px] overflow-hidden" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                            </div>
                            <span className="text-lux-pale/50 text-xs ml-auto">5.0 Only</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group/item">
                            <input type="radio" name="rating" className="size-4 border-lux-gold/40 bg-lux-navy-light text-lux-gold focus:ring-0 transition-colors" />
                            <div className="flex text-lux-gold">
                                {[1, 2, 3, 4].map(s => <span key={s} className="material-symbols-outlined text-[16px] overflow-hidden" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                <span className="material-symbols-outlined text-[16px] text-lux-gold/30">star</span>
                            </div>
                            <span className="text-lux-pale/50 text-xs ml-auto">4.0 & up</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilter;
