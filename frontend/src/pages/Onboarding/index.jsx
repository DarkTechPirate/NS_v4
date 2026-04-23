import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = () => {
    const [role, setRole] = useState('');
    const [details, setDetails] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { checkUser } = useAuth(); // Re-fetch user context after onboarding

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === 'customer') {
            setDetails({ phone: '' });
        } else if (selectedRole === 'vendor') {
            setDetails({ name: '', category: '', priceRate: '', location: '', description: '' });
        } else if (selectedRole === 'venue') {
            setDetails({ name: '', capacity: '', priceRate: '', location: '', description: '' });
        }
    };

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/onboarding`, { role, details }, {
                withCredentials: true
            });
            await checkUser(); // Ensure context is updated
            navigate('/dashboard');
        } catch (err) {
            console.error('Onboarding failed', err);
            alert('Failed to save onboarding details. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display relative overflow-hidden">
            {/* Decorative BG Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="max-w-2xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {!role ? (
                        <motion.div 
                            key="role-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-off-navy-light p-10 rounded-2xl shadow-2xl border border-primary/10 text-center"
                        >
                            <span className="material-symbols-outlined text-primary text-5xl mb-4 block">diamond</span>
                            <h1 className="text-3xl md:text-4xl font-serif text-off-navy dark:text-pale mb-2">Welcome to Luxe</h1>
                            <p className="text-gray-500 mb-10 text-sm">To best tailor your experience, please tell us how you'll be using the platform.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button 
                                    onClick={() => handleRoleSelect('customer')} 
                                    className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-4xl mb-4 text-gray-400 group-hover:text-primary transition-colors">celebration</span>
                                    <h2 className="text-lg font-bold mb-2 text-off-navy dark:text-white uppercase tracking-wider text-sm">Customer</h2>
                                    <p className="text-xs text-gray-500">I am planning an event.</p>
                                </button>
                                <button 
                                    onClick={() => handleRoleSelect('vendor')} 
                                    className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-4xl mb-4 text-gray-400 group-hover:text-primary transition-colors">camera_alt</span>
                                    <h2 className="text-lg font-bold mb-2 text-off-navy dark:text-white uppercase tracking-wider text-sm">Vendor</h2>
                                    <p className="text-xs text-gray-500">I provide services (Photo, DJ).</p>
                                </button>
                                <button 
                                    onClick={() => handleRoleSelect('venue')} 
                                    className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-4xl mb-4 text-gray-400 group-hover:text-primary transition-colors">location_city</span>
                                    <h2 className="text-lg font-bold mb-2 text-off-navy dark:text-white uppercase tracking-wider text-sm">Venue</h2>
                                    <p className="text-xs text-gray-500">I have a space to rent.</p>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="details-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-off-navy-light p-10 rounded-2xl shadow-2xl border border-primary/10"
                        >
                            <div className="flex items-center mb-8">
                                <button 
                                    type="button" 
                                    onClick={() => setRole('')} 
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    <span className="text-xs uppercase tracking-widest font-bold">Back</span>
                                </button>
                                <h1 className="text-2xl font-serif text-center flex-1 pr-10 text-off-navy dark:text-pale capitalize">{role} Details</h1>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {Object.keys(details).map(key => (
                                    <div key={key}>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{key}</label>
                                        {key === 'description' ? (
                                            <textarea
                                                name={key}
                                                value={details[key]}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-4 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors resize-none h-32"
                                                placeholder={`Tell us about your ${role}...`}
                                                required={key !== 'description'}
                                            ></textarea>
                                        ) : (
                                            <input
                                                type={key === 'capacity' ? 'number' : 'text'}
                                                name={key}
                                                value={details[key]}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-4 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                                                placeholder={`Enter ${key}`}
                                                required={key !== 'phone'}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            Complete Onboarding
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
