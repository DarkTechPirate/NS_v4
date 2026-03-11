import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Background with Parallax Feel */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050A30]/40 via-[#050A30]/20 to-[#050A30] z-10"></div>
                <img
                    alt="Elegant bride and groom silhouette in a grand hall with warm lighting"
                    className="w-full h-full object-cover object-center animate-ken-burns scale-105"
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-8 mt-16">
                <span className="text-primary tracking-[0.3em] text-sm font-bold uppercase animate-fade-in-up delay-100">Exclusivity. Artistry. Perfection.</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight animate-fade-in-up delay-200">
                    Curating the <br />
                    <span className="italic font-light text-pale/90">Finest Weddings</span>
                </h1>
                <p className="text-pale/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed animate-fade-in-up delay-300">
                    Access the top 1% of wedding artisans. We connect discerning couples with world-class vendors for moments that echo through eternity.
                </p>
                <div className="mt-8 animate-fade-in-up delay-500">
                    <button className="group relative px-8 py-4 bg-primary text-white overflow-hidden rounded-sm transition-all hover:bg-lux-gold/80 shadow-[0_0_20px_rgba(120,93,50,0.3)]">
                        <span className="relative z-10 font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                            Begin Your Journey
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
                <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
            </div>
        </section>
    );
};

export default HeroSection;
