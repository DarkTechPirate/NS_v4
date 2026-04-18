import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUnreadMessageCount } from '../../services/messagingService';

const Sidebar = ({ user, data, loading }) => {
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const res = await getUnreadMessageCount();
                if (res && typeof res.unreadCount !== 'undefined') {
                    setUnreadCount(res.unreadCount);
                }
            } catch (err) {
                console.error("Failed to load unread messages");
            }
        };
        fetchUnread();
    }, []);

    const isActive = (path) => location.pathname === path;
    return (
        <aside className="w-full md:w-64 bg-lux-navy border-r border-lux-gold/10 hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 pt-24 pb-8 px-6">
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-lux-pale/50 mb-4 block">Main</span>
                <nav className="space-y-2">
                    <Link to="/dashboard" className={`flex items-center gap-3 font-medium p-3 rounded-sm transition-colors ${isActive('/dashboard') ? 'text-lux-gold bg-lux-gold/10' : 'text-lux-pale/70 hover:text-lux-gold'}`}>
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        Dashboard
                    </Link>
                    <Link to="/messages" className={`flex items-center gap-3 font-medium p-3 rounded-sm transition-colors ${isActive('/messages') ? 'text-lux-gold bg-lux-gold/10' : 'text-lux-pale/70 hover:text-lux-gold'}`}>
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        Messages
                        {unreadCount > 0 && (
                            <span className="ml-auto bg-lux-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                        )}
                    </Link>
                    <Link to="/wishlist" className={`flex items-center gap-3 font-medium p-3 rounded-sm transition-colors ${isActive('/wishlist') ? 'text-lux-gold bg-lux-gold/10' : 'text-lux-pale/70 hover:text-lux-gold'}`}>
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                        Wishlist
                    </Link>
                    <Link to="/calendar" className={`flex items-center gap-3 font-medium p-3 rounded-sm transition-colors ${isActive('/calendar') ? 'text-lux-gold bg-lux-gold/10' : 'text-lux-pale/70 hover:text-lux-gold'}`}>
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        Calendar
                    </Link>
                </nav>
            </div>

            <div className="mt-auto">
                <div className="bg-lux-navy-light p-4 rounded-sm border border-lux-gold/20 mb-6">
                    <p className="text-xs text-lux-pale/60 uppercase tracking-widest mb-1">Budget Used</p>
                    <p className="text-lux-gold font-bold text-lg">${data?.budgetUsed?.toLocaleString() || 0} <span className="text-xs text-lux-pale">/ ${data?.overallBudget?.toLocaleString() || 0}</span></p>
                    <div className="w-full h-1 bg-lux-rough/30 mt-2 rounded-full overflow-hidden">
                        <div className="bg-lux-gold h-full transition-all duration-1000" style={{ width: `${data?.overallBudget ? Math.min((data.budgetUsed / data.overallBudget) * 100, 100) : 0}%` }}></div>
                    </div>
                </div>
                <div className="flex items-center gap-3 border-t border-lux-gold/10 pt-6">
                    <div className="w-10 h-10 rounded-full bg-lux-pale/20 overflow-hidden shrink-0">
                        <img src={user?.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=100&q=80"} className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div className="truncate">
                        <p className="text-white text-sm font-bold truncate">{user?.fullname || 'User'}</p>
                        <Link to="/profile" className="text-lux-pale/50 hover:text-lux-gold transition-colors text-xs">Manage Account</Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
