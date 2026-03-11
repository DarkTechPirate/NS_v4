import React from 'react';

const Concierge = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <span className="text-primary text-sm tracking-[0.2em] uppercase font-bold mb-4 block">Premium Service</span>
                <h1 className="text-5xl font-serif text-off-navy dark:text-pale mb-6">Luxe Concierge</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                    Experience wedding planning redefined. Our dedicated concierge team handles every detail, so you can cherish every moment.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {[
                    { title: "Venue Scouting", icon: "location_city", desc: "Access to exclusive, private estates and luxury venues not available to the public." },
                    { title: "Vendor Curation", icon: "groups", desc: "Hand-picked team of varied artisans and professionals tailored to your style." },
                    { title: "Guest Logistics", icon: "flight_takeoff", desc: "Seamless travel, accommodation, and transport arrangements for all your guests." }
                ].map((service, idx) => (
                    <div key={idx} className="p-8 border border-primary/20 rounded-xl bg-gradient-to-br from-white to-background-light dark:from-off-navy-light dark:to-off-navy hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                        <span className="material-symbols-outlined text-5xl text-primary mb-6">{service.icon}</span>
                        <h3 className="text-2xl font-serif text-off-navy dark:text-pale mb-4">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-off-navy text-center p-12 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-serif text-pale mb-6">Ready to elevate your experience?</h2>
                    <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-colors">
                        Contact Concierge
                    </button>
                </div>
                {/* Decorative background elements could go here */}
            </div>
        </div>
    );
};

export default Concierge;
