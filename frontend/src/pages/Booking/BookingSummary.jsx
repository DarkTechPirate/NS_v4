import React from 'react';

const BookingSummary = ({ step, selectedDate, selectedTime, selectedPackage }) => {
    return (
        <div className="bg-lux-navy p-8 rounded-sm text-lux-pale sticky top-24">
            <h3 className="font-serif text-2xl text-white mb-6">Booking Summary</h3>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-16 h-16 bg-lux-pale/10 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Vendor" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-medium text-white">Lumière Photography</h4>
                    <span className="text-xs text-lux-gold font-bold uppercase tracking-wider">Verified Artisan</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                    <span className="text-lux-pale/60">Date</span>
                    <span className="text-white">{selectedDate || 'Select Date'}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-lux-pale/60">Time</span>
                    <span className="text-white">{selectedTime || 'Select Time'}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-lux-pale/60">Package</span>
                    <span className="text-white text-right">{selectedPackage?.name || 'Select Package'}</span>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-end">
                    <span className="text-sm text-lux-pale/60">Total Estimate</span>
                    <span className="text-2xl font-serif text-lux-gold">{selectedPackage?.price || '$0'}</span>
                </div>
            </div>

            <div className="text-xs text-lux-pale/40 text-center leading-relaxed">
                By proceeding, you agree to our Terms of Service. A 50% deposit will be required to secure your date upon vendor acceptance.
            </div>
        </div>
    );
};

export default BookingSummary;
