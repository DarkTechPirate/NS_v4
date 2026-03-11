import React from 'react';

const DashboardWidgets = () => {
    return (
        <div className="flex-1">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Vendors Booked</p>
                    <p className="text-4xl font-serif text-lux-navy">4<span className="text-lg text-lux-pale/50 mx-1">/</span>12</p>
                </div>
                <div className="bg-white border border-lux-gold/20 p-6 rounded-lg shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-lux-navy/50 mb-2">Pending Inquiries</p>
                    <p className="text-4xl font-serif text-lux-gold">3</p>
                </div>
                <div className="bg-lux-navy text-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-lux-gold/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <p className="text-xs uppercase tracking-widest text-lux-pale/50 mb-2">Days to "I Do"</p>
                    <p className="text-4xl font-serif">214</p>
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
                        {[
                            { name: 'Lumière Photography', status: 'Pending', date: 'Today, 10:23 AM', avatar: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&w=100&q=80' },
                            { name: 'Chateau Saint-Martin', status: 'Replied', date: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1519225468359-2996515c9dc4?ixlib=rb-4.0.3&w=100&q=80' },
                            { name: 'Velvet & Vine', status: 'Booked', date: 'May 18', avatar: 'https://images.unsplash.com/photo-1586942398572-c5188f615456?ixlib=rb-4.0.3&w=100&q=80' }
                        ].map((inq, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 border-b border-lux-gold/5 last:border-0 hover:bg-lux-gold/5 transition-colors cursor-pointer">
                                <div className="w-12 h-12 rounded bg-black/10 overflow-hidden">
                                    <img src={inq.avatar} className="w-full h-full object-cover" alt={inq.name} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-lux-navy">{inq.name}</h4>
                                    <p className="text-xs text-lux-navy/50">{inq.date}</p>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${inq.status === 'Booked' ? 'bg-green-100 text-green-700' :
                                        inq.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {inq.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl text-lux-navy">Timeline</h3>
                    </div>
                    <div className="bg-white border border-lux-gold/10 rounded-lg shadow-sm p-6">
                        <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[1px] before:bg-lux-gold/20">
                            {[
                                { title: 'Tasting at Chateau', date: 'Jun 12', time: '2:00 PM' },
                                { title: 'Dress Fitting', date: 'Jun 24', time: '10:00 AM' },
                                { title: 'Final Guest List', date: 'Jul 01', time: 'Anytime' }
                            ].map((event, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-lux-gold bg-white z-10"></div>
                                    <h4 className="font-medium text-lux-navy">{event.title}</h4>
                                    <p className="text-xs text-lux-navy/50 mt-1">{event.date} • {event.time}</p>
                                </div>
                            ))}
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
