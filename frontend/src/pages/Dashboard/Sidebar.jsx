import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-full md:w-64 bg-lux-navy border-r border-lux-gold/10 hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 pt-24 pb-8 px-6">
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-lux-pale/50 mb-4 block">Main</span>
                <nav className="space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 text-lux-gold font-medium bg-lux-gold/10 p-3 rounded-sm">
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        Dashboard
                    </Link>
                    <Link to="#" className="flex items-center gap-3 text-lux-pale/70 hover:text-lux-gold font-medium p-3 rounded-sm transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        Messages
                        <span className="ml-auto bg-lux-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
                    </Link>
                    <Link to="#" className="flex items-center gap-3 text-lux-pale/70 hover:text-lux-gold font-medium p-3 rounded-sm transition-colors">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                        Wishlist
                    </Link>
                    <Link to="#" className="flex items-center gap-3 text-lux-pale/70 hover:text-lux-gold font-medium p-3 rounded-sm transition-colors">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        Calendar
                    </Link>
                </nav>
            </div>

            <div className="mt-auto">
                <div className="bg-lux-navy-light p-4 rounded-sm border border-lux-gold/20 mb-6">
                    <p className="text-xs text-lux-pale/60 uppercase tracking-widest mb-1">Budget Used</p>
                    <p className="text-lux-gold font-bold text-lg">$45,200</p>
                    <div className="w-full h-1 bg-lux-rough/30 mt-2 rounded-full overflow-hidden">
                        <div className="bg-lux-gold h-full w-[65%]"></div>
                    </div>
                </div>
                <div className="flex items-center gap-3 border-t border-lux-gold/10 pt-6">
                    <div className="w-10 h-10 rounded-full bg-lux-pale/20 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=100&q=80" className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">Alexandra M.</p>
                        <p className="text-lux-pale/50 text-xs">Manage Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
