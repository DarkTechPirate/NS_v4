import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
    return (
        <div className="flex-1 flex items-center justify-center p-6 h-full">
            <div className="max-w-xl w-full bg-white border border-lux-gold/20 p-12 text-center rounded-lg shadow-2xl relative overflow-hidden mt-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lux-gold via-lux-pale to-lux-gold"></div>

                <div className="inline-flex items-center justify-center w-20 h-20 bg-lux-gold/10 rounded-full mb-8">
                    <span className="material-symbols-outlined text-4xl text-lux-gold">check_circle</span>
                </div>

                <h1 className="text-4xl font-serif text-lux-navy mb-4">Request Sent</h1>
                <p className="text-lux-pale/60 text-lg leading-relaxed mb-8">
                    Your booking request has been forwarded to Lumière Photography. <br />
                    They will review your details and respond within 24 hours.
                </p>

                <div className="bg-lux-navy/5 p-6 rounded mb-8 text-left">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs uppercase tracking-widest text-lux-navy/50">Reference ID</span>
                        <span className="font-mono text-lux-navy font-bold">#LX-2024-8892</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs uppercase tracking-widest text-lux-navy/50">Date</span>
                        <span className="font-medium text-lux-navy">May 20, 2024</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Link to="/dashboard" className="w-full bg-lux-navy text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-gold transition-colors">
                        Go to Dashboard
                    </Link>
                    <Link to="/" className="text-lux-navy text-xs font-bold uppercase tracking-widest hover:text-lux-gold transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
