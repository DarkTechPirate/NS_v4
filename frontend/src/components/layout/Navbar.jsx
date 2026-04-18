import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logoutUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled 
            ? 'bg-[#FFCCB6] shadow-xl py-3 border-b border-[#E89E84]' 
            : 'bg-[#050A30] py-5 border-b border-white/5'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <span className={`material-symbols-outlined text-3xl group-hover:rotate-180 transition-transform duration-700 ${isScrolled ? 'text-[#050A30]' : 'text-[#D4AF37]'}`}>diamond</span>
                    <span className={`text-lg font-light tracking-[0.2em] uppercase ${isScrolled ? 'text-[#050A30]' : 'text-white'}`}>Luxe Matrimony</span>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    {['Venues', 'Vendors', 'Stories'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 relative group ${isScrolled ? 'text-[#050A30]/80 hover:text-[#050A30]' : 'text-white/80 hover:text-[#D4AF37]'}`}
                        >
                            {item}
                            <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-[#050A30]' : 'bg-[#D4AF37]'}`}></span>
                        </Link>
                    ))}
                    {/* Role-based Dashboard Link */}
                    {user && (
                        <Link
                            to={user.role === 'admin' ? '/admin' : user.role === 'vendor' ? '/provider' : '/dashboard'}
                            className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 px-4 py-1.5 rounded border ${
                                isScrolled 
                                ? 'text-[#050A30] border-[#050A30]/20 hover:bg-[#050A30] hover:text-white' 
                                : 'text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#050A30]'
                            }`}
                        >
                            {user.role === 'admin' ? 'Admin Office' : user.role === 'vendor' ? 'Provider Area' : 'My Planner'}
                        </Link>
                    )}
                </nav>

                {user ? (
                    <div className="hidden md:flex items-center gap-5">
                        <Link to="/profile" className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-[#050A30]' : 'text-white/90'}`}>
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className={`w-8 h-8 rounded-full border object-cover ${isScrolled ? 'border-[#050A30]/20' : 'border-[#D4AF37]/30'}`} />
                            ) : (
                                <span className="material-symbols-outlined">account_circle</span>
                            )}
                            <span className="text-[10px] font-bold tracking-[0.1em] uppercase">{user.fullname.split(' ')[0]}</span>
                        </Link>
                        <button onClick={logoutUser} className={`transition-colors ${isScrolled ? 'text-[#050A30]/40 hover:text-[#050A30]' : 'text-white/40 hover:text-white'}`}>
                            <span className="material-symbols-outlined text-sm">logout</span>
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 text-[10px] font-bold tracking-widest uppercase shadow-sm ${
                        isScrolled 
                        ? 'bg-[#050A30] text-white hover:bg-black' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-[#050A30]'
                    }`}>
                        <span>Request Access</span>
                    </Link>
                )}

                <button className="md:hidden text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
