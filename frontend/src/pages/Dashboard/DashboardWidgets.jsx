import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';

const DashboardWidgets = ({ data, loading }) => {
    const pendingCount = data?.pendingInquiries || 0;
    const acceptedCount = data?.vendorsBooked || 0;
    const bookings = data?.bookings || [];
    const timeline = data?.timeline || [];

    return (
        <div className="flex-1">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Vendors Booked</p>
                    <p className="text-4xl font-serif text-lux-navy">{acceptedCount}<span className="text-lg text-lux-pale/50 mx-1">/</span>12</p>
                </div>
                <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Pending Inquiries</p>
                    <p className="text-4xl font-serif text-lux-gold">{pendingCount}</p>
                </div>
                <div className="bg-lux-navy text-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-lux-gold/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <p className="text-xs uppercase tracking-widest text-lux-pale/50 mb-2">Days to "I Do"</p>
                    <p className="text-4xl font-serif">
                        {data?.daysToIDo !== null && data?.daysToIDo !== undefined ? data.daysToIDo : '--'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl text-lux-navy">Recent Inquiries</h3>
                        <button className="text-xs font-bold uppercase tracking-widest text-lux-gold hover:text-lux-navy transition-colors">View All</button>
                    </div>
                    <div className="bg-white border border-lux-gold/10 rounded-lg shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="p-4 text-center text-lux-navy/50">Loading...</div>
                        ) : bookings.length === 0 ? (
                            <div className="p-4 text-center text-lux-navy/50">No inquiries yet.</div>
                        ) : (
                            bookings.map((inq, i) => (
                                <div key={inq._id || i} className="flex items-center gap-4 p-4 border-b border-lux-gold/5 last:border-0 hover:bg-lux-gold/5 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded bg-black/10 overflow-hidden shrink-0">
                                        <img src={getImageUrl(inq.providerId?.coverImage || inq.providerId?.images?.[0])} className="w-full h-full object-cover" alt={inq.providerId?.name || "Provider"} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-lux-navy">{inq.providerId?.name || "Unknown Provider"}</h4>
                                        <p className="text-xs text-lux-navy/50">{new Date(inq.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${inq.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                            inq.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                            inq.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {inq.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl text-lux-navy">Timeline</h3>
                    </div>
                    <div className="bg-white border border-lux-gold/10 rounded-lg shadow-sm p-6">
                        <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[1px] before:bg-lux-gold/20">
                            {timeline.length === 0 ? (
                                <div className="text-sm text-lux-navy/50 pl-8">No events timeline available yet. Accept a vendor booking to see it here!</div>
                            ) : (
                                timeline.map((event, i) => (
                                    <div key={i} className="relative pl-8">
                                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-lux-gold bg-white z-10"></div>
                                        <h4 className="font-medium text-lux-navy">{event.title}</h4>
                                        <p className="text-xs text-lux-navy/50 mt-1">{event.date} • {event.time}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className="w-full mt-8 border border-lux-gold/20 py-2 text-lux-navy text-xs font-bold uppercase tracking-widest hover:bg-lux-gold hover:text-white transition-colors rounded-sm">
                            View Calendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;
