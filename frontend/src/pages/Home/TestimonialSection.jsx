import React from 'react';

const TestimonialSection = () => {
    return (
        <section className="py-40 bg-[#070e3d] relative overflow-hidden">
            {/* Abstract Background shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rough/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-8">format_quote</span>
                <blockquote className="text-3xl md:text-5xl font-serif text-white leading-tight mb-12">
                    "We didn't just plan a wedding; we created a masterpiece. Every vendor suggested was not just a service provider, but a true artist."
                </blockquote>
                <div className="flex flex-col items-center gap-2">
                    <cite className="text-primary not-italic font-bold tracking-widest uppercase text-sm">Alexandra & James</cite>
                    <span className="text-pale/50 text-xs uppercase tracking-widest">Married in Tuscany, 2023</span>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
