import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProviderBookings, updateBookingStatus } from '../../services/bookingService';
import { getAllVendors, uploadVendorImage } from '../../services/vendorService';
import { getAllVenues, uploadVenueImage } from '../../services/venueService';

const ProviderDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [myVendors, setMyVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch vendors and venues for the owner
                const vendorRes = await getAllVendors();
                const venueRes = await getAllVenues();
                let owned = [];
                if (vendorRes.success) {
                    owned = [...owned, ...vendorRes.data.filter(v => v.ownerId === user?._id).map(v => ({ ...v, type: 'Vendor' }))];
                }
                if (venueRes.success) {
                    owned = [...owned, ...venueRes.data.filter(v => v.ownerId === user?._id).map(v => ({ ...v, type: 'Venue' }))];
                }
                setMyVendors(owned);

                // Fetch bookings for each owned listing
                    let allBookings = [];
                    for (const vendor of owned) {
                        const bRes = await getProviderBookings(vendor._id);
                        if (bRes.success) {
                            allBookings = [...allBookings, ...bRes.data];
                        }
                    }
                    
                    // Sort by newest
                    allBookings.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setBookings(allBookings);
            } catch (err) {
                console.error("Dashboard error", err);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'vendor') {
            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleAction = async (id, status) => {
        try {
            await updateBookingStatus(id, status);
            // Update local state
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleImageUpload = async (id, type, e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (type === 'Vendor') {
                await uploadVendorImage(id, file);
            } else {
                await uploadVenueImage(id, file);
            }
            // Refresh list
            window.location.reload(); 
        } catch (err) {
            alert("Image upload failed");
        }
    };

    if (!user || user.role !== 'vendor') {
        return <div className="min-h-screen pt-32 text-center text-lux-pale">Access Denied. Provider account required.</div>;
    }

    if (loading) {
        return <div className="min-h-screen pt-32 text-center text-lux-pale">Loading Dashboard...</div>;
    }

    return (
        <div className="bg-background-light min-h-screen font-display pb-20 pt-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 border-b border-lux-gold/10 pb-6">
                    <h1 className="text-4xl font-serif text-lux-navy mb-2">Provider Dashboard</h1>
                    <p className="text-sm text-lux-navy/60">Manage your inquiries, bookings, and listings across {myVendors.length} active spaces.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Listings */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-lux-gold/10 overflow-hidden mb-8">
                            <div className="p-6 border-b border-lux-gold/5 bg-lux-navy-light/5 text-lux-navy font-serif text-2xl">
                                My Listings
                            </div>
                            <div className="p-6 space-y-6">
                                {myVendors.length === 0 ? (
                                    <p className="text-lux-navy/50 text-sm">No listings yet.</p>
                                ) : (
                                    myVendors.map(v => (
                                        <div key={v._id} className="group relative">
                                            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-background-light border border-lux-gold/20 mb-3 relative">
                                                <img src={v.coverImage || v.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} alt={v.name} className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest cursor-pointer transition-opacity backdrop-blur-sm">
                                                    Upload Image
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(v._id, v.type, e)} />
                                                </label>
                                            </div>
                                            <h3 className="font-medium text-lux-navy">{v.name}</h3>
                                            <div className="flex justify-between text-xs text-lux-navy/60 mt-1">
                                                <span>{v.type}</span>
                                                <span>{v.verified ? 'Verified' : 'Unverified'}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bookings */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-lux-gold/10 overflow-hidden">
                            <div className="p-6 border-b border-lux-gold/5 bg-lux-navy-light/5 text-lux-navy font-serif text-2xl flex justify-between items-center">
                                Recent Requests
                                <span className="text-sm font-sans tracking-widest uppercase font-bold text-lux-gold">{bookings.length} Total</span>
                            </div>
                    
                    <div className="divide-y divide-lux-gold/5">
                        {bookings.length === 0 ? (
                            <div className="p-10 text-center text-lux-navy/50">You have no booking requests yet.</div>
                        ) : (
                            bookings.map(booking => (
                                <div key={booking._id} className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-lg text-lux-navy">{booking.customerId?.fullname || 'Client'}</h3>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                booking.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-lux-navy/70 mb-1">
                                            <strong>Requested Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-lux-navy/70 mb-1">
                                            <strong>Package/Event:</strong> {booking.eventType || 'Custom'}
                                        </p>
                                        <div className="mt-4 text-sm bg-background-light p-3 border border-lux-gold/10 rounded italic text-lux-navy/80">
                                            "{booking.specialRequests || 'No special requests'}"
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3 min-w-[200px]">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleAction(booking._id, 'accepted')} className="bg-lux-gold text-white font-bold uppercase text-[10px] tracking-widest py-3 px-4 hover:bg-lux-navy transition-colors rounded shadow-sm w-full">Accept Request</button>
                                                <button onClick={() => handleAction(booking._id, 'rejected')} className="border border-red-200 text-red-500 font-bold uppercase text-[10px] tracking-widest py-3 px-4 hover:bg-red-50 transition-colors rounded w-full">Decline</button>
                                            </>
                                        )}
                                        {booking.status === 'accepted' && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded text-xs">
                                                <strong>Contact:</strong> {booking.contactPhone || booking.customerId?.phone || 'No phone provided'}<br/>
                                                {booking.customerId?.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default ProviderDashboard;
