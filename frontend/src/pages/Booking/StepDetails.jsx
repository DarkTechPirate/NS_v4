import React from 'react';

const StepDetails = () => {
    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-serif text-lux-navy mb-6">Your Details</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-lux-navy mb-2">First Name</label>
                        <input type="text" className="w-full bg-background-light border border-lux-gold/20 rounded p-3 text-lux-navy focus:border-lux-gold focus:ring-0 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-lux-navy mb-2">Last Name</label>
                        <input type="text" className="w-full bg-background-light border border-lux-gold/20 rounded p-3 text-lux-navy focus:border-lux-gold focus:ring-0 outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-lux-navy mb-2">Email Address</label>
                        <input type="email" className="w-full bg-background-light border border-lux-gold/20 rounded p-3 text-lux-navy focus:border-lux-gold focus:ring-0 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-lux-navy mb-2">Phone Number</label>
                        <input type="tel" className="w-full bg-background-light border border-lux-gold/20 rounded p-3 text-lux-navy focus:border-lux-gold focus:ring-0 outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-lux-navy mb-2">Project Vision</label>
                    <textarea
                        className="w-full h-32 bg-background-light border border-lux-gold/20 rounded p-3 text-lux-navy focus:border-lux-gold focus:ring-0 outline-none resize-none"
                        placeholder="Tell us about your day, venue aesthetic, and what you're looking for..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default StepDetails;
