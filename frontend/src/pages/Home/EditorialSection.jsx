import React from 'react';
import { Link } from 'react-router-dom';

const EditorialSection = () => {
    return (
        <section className="py-32 bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-primary"></div>
                        <span className="text-primary text-sm tracking-[0.2em] font-bold uppercase">The Edit</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                        Timeless Elegance in <br /> <span className="text-primary/90 italic">Southern France</span>
                    </h2>
                    <p className="text-pale/70 text-lg leading-relaxed mb-10 font-light">
                        Discover the Chateau Saint-Martin, where history meets modern luxury. An exclusive look into one of the world's most coveted wedding destinations, featuring floral designs that defy gravity and culinary experiences that tantalize the senses.
                    </p>
                    <Link to="#" className="inline-flex items-center gap-3 text-white border-b border-primary/50 pb-1 hover:text-primary hover:border-primary transition-all duration-300 uppercase tracking-widest text-sm font-medium group">
                        Read the Story
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-2">arrow_right_alt</span>
                    </Link>
                </div>
                <div className="order-1 lg:order-2 relative group cursor-pointer">
                    <div className="absolute -inset-4 bg-rough/20 rounded-lg transform rotate-2 transition-transform duration-500 group-hover:rotate-0"></div>
                    <div className="relative h-[600px] w-full overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                            alt="Lavish outdoor wedding table setting with flowers"
                            className="h-full w-full object-cover transform scale-100 transition-transform duration-1000 group-hover:scale-110"
                            src="https://images.unsplash.com/photo-1519225468359-2996515c9dc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-background-dark p-6 border border-white/5 shadow-xl max-w-xs z-20 hidden md:block">
                        <p className="text-primary text-xs tracking-widest uppercase mb-2">Featured Vendor</p>
                        <p className="text-white font-serif text-xl">Fleur de Luxe</p>
                        <p className="text-pale/50 text-xs mt-2">Paris, France</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialSection;
