import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signup } from '../../services/authService';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await signup({
                fullname: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });
            loginUser(data.user);
            navigate('/onboarding');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
            <div className="max-w-md w-full bg-white dark:bg-off-navy-light p-8 rounded-lg shadow-2xl border border-primary/10">
                <div className="text-center mb-8">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">diamond</span>
                    <h2 className="text-2xl font-serif text-off-navy dark:text-pale">Join Luxe Matrimony</h2>
                    <p className="text-sm text-gray-500 mt-2">Begin your journey with us</p>
                </div>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                placeholder="Jane"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-primary/20">
                        Create Account
                    </button>
                    <div className="text-center text-xs text-gray-500 mt-4">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
