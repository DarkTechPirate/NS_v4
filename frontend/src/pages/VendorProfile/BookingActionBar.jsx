import React from 'react';
import { Link } from 'react-router-dom';

const BookingActionBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-md border-t border-white/10 py-4 z-50">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="hidden md:block">
                    <p className="text-white font-serif text-lg">Lumière Photography</p>
                    <p className="text-lux-gold text-xs font-bold uppercase tracking-widest">Starting at $6,500</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none border border-white/20 text-white px-6 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-lux-navy transition-colors">
                        Inquire
                    </button>
                    <Link to="/booking" className="flex-1 md:flex-none bg-lux-gold text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-lux-gold transition-colors text-center flex items-center justify-center gap-2">
                        <span>Request Booking</span>
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingActionBar;
