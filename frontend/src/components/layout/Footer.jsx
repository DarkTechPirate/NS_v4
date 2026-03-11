import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background-dark pt-24 pb-12 border-t border-white/5 text-pale">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary text-2xl">diamond</span>
                            <span className="text-white text-sm font-light tracking-[0.2em] uppercase">Luxe</span>
                        </div>
                        <p className="text-pale/50 text-sm leading-relaxed mb-6">
                            The definitive guide to luxury weddings. Connecting the world's most discerning couples with the finest artisans.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-pale/50 hover:text-primary transition-colors cursor-pointer">INST</a>
                            <a className="text-pale/50 hover:text-primary transition-colors cursor-pointer">PIN</a>
                            <a className="text-pale/50 hover:text-primary transition-colors cursor-pointer">FB</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Directory</h4>
                        <ul className="space-y-4 text-sm text-pale/60">
                            {['Venues', 'Photographers', 'Planners', 'Floral Design', 'Haute Couture'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-pale/60">
                            {['About Us', 'The Edit (Blog)', 'Careers', 'Press', 'Contact'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Newsletter</h4>
                        <p className="text-pale/50 text-sm mb-4">Receive our monthly curation of trends and inspiration.</p>
                        <div className="flex border-b border-white/20 pb-2">
                            <input
                                className="bg-transparent border-none p-0 text-white placeholder-pale/30 focus:ring-0 w-full text-sm outline-none"
                                placeholder="Email Address"
                                type="email"
                            />
                            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">Join</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-pale/30 text-xs">© 2024 LUXURY MATRIMONY. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-pale/30">
                        <Link to="#" className="hover:text-pale">Privacy Policy</Link>
                        <Link to="#" className="hover:text-pale">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
