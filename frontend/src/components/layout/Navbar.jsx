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
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-180 transition-transform duration-700">diamond</span>
                    <span className="text-white text-lg font-light tracking-[0.2em] uppercase">Luxe Matrimony</span>
                </Link>

                <nav className="hidden md:flex items-center gap-12">
                    {['Venues', 'Vendors', 'Stories', 'Concierge'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-pale/80 hover:text-primary text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {user ? (
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/profile" className="flex items-center gap-2 text-pale/80 hover:text-primary transition-colors">
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full border border-primary/30 object-cover" />
                            ) : (
                                <span className="material-symbols-outlined">account_circle</span>
                            )}
                            <span className="text-sm font-medium tracking-wide uppercase">{user.fullname}</span>
                        </Link>
                        <button onClick={logoutUser} className="text-white/40 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="hidden md:flex items-center gap-2 bg-transparent border border-primary/50 text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-xs font-bold tracking-widest uppercase">
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
