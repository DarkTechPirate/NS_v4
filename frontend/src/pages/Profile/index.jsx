import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfileInfo, uploadProfileImage } from '../../services/profileService';

const Profile = () => {
    const { user, loginUser } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullname || '',
                phone: user.phone || '',
                password: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await updateProfileInfo(formData);
            loginUser({ ...user, ...res.user });
            setMessage('Profile updated successfully!');
            setFormData({ ...formData, password: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        try {
            const res = await uploadProfileImage(file);
            console.log("Upload res:", res); // Debug
            // Update user context with new image URL
            loginUser({ ...user, profilePicture: res.user.profilePicture });
            setMessage('Profile picture updated!');
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    if (!user) return <div className="p-10 text-center">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif text-primary mb-8">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar / Image */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-off-navy-light p-6 rounded-lg shadow-lg border border-primary/10 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                            <img
                                src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
                        </div>
                        <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest py-2 px-4 rounded transition-colors inline-block">
                            Change Photo
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        <h3 className="mt-4 text-xl font-serif text-off-navy dark:text-pale">{user.fullname}</h3>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="bg-white dark:bg-off-navy-light p-8 rounded-lg shadow-lg border border-primary/10">
                        <h2 className="text-2xl font-serif text-off-navy dark:text-pale mb-6">Edit Details</h2>
                        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}
                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">New Password (Optional)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current"
                                    className="w-full bg-gray-50 dark:bg-off-navy border border-gray-200 dark:border-gray-700 p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors shadow-lg">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
