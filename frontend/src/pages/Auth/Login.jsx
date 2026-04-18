import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login({ email, password });
            loginUser(data.user);
            if (data.user.onboardingComplete === false) {
                navigate('/onboarding');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
            <div className="max-w-md w-full bg-white dark:bg-off-navy-light p-8 rounded-lg shadow-2xl border border-primary/10">
                <div className="text-center mb-8">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">diamond</span>
                    <h2 className="text-2xl font-serif text-off-navy dark:text-pale">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-2">Sign in to your Luxe account</p>
                </div>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-primary/20">
                        Sign In
                    </button>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                        <Link to="/forgot-password" className="hover:text-primary transition-colors">Forgot Password?</Link>
                        <Link to="/signup" className="hover:text-primary transition-colors">Create Account</Link>
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Or continue with</p>
                    <a href="http://localhost:3000/api/auth/google" className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span>Google</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
