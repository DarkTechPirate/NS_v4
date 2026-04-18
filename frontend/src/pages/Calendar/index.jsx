import React, { useState, useEffect } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { getDashboardData } from '../../services/profileService';
import { getDaysInMonth, startOfMonth, format, addMonths, subMonths, isSameDay } from 'date-fns';

const Calendar = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardData();
                if (res.success) setDashboardData(res.dashboard);
            } catch (err) {
                console.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const timeline = dashboardData?.timeline || [];
    const weddingDate = dashboardData?.weddingDate ? new Date(dashboardData.weddingDate) : null;

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const startingDayOfWeek = monthStart.getDay(); // 0 is Sunday

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="p-4 border border-transparent"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        
        // Find events on this day
        const dayEvents = timeline.filter(event => isSameDay(new Date(event.timestamp), dateObj));
        const isWeddingDay = weddingDate && isSameDay(weddingDate, dateObj);

        days.push(
            <div key={d} className={`p-4 border border-gray-100 min-h-[100px] flex flex-col ${isWeddingDay ? 'bg-lux-gold/5 border-lux-gold/30' : 'bg-white'} hover:shadow-md transition-shadow relative group`}>
                <span className={`text-sm font-medium ${isWeddingDay ? 'text-lux-gold' : 'text-gray-500'} mb-2 inline-block`}>{d}</span>
                
                {isWeddingDay && (
                    <div className="bg-lux-gold text-white text-[10px] px-2 py-1 rounded truncate mb-1 shadow-sm font-bold uppercase tracking-widest">
                        💍 THE BIG DAY!
                    </div>
                )}
                
                {dayEvents.map((ev, idx) => (
                    <div key={idx} className="bg-lux-navy/5 border-l-2 border-lux-navy text-[10px] p-1.5 rounded truncate mb-1 text-lux-navy font-medium" title={ev.title}>
                        {ev.time} - {ev.title}
                    </div>
                ))}

                {dayEvents.length === 0 && !isWeddingDay && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                        <button className="text-[10px] text-lux-pale/50 uppercase tracking-widest font-bold hover:text-lux-gold">+ Add</button>
                    </div>
                )}
            </div>
        );
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-background-light min-h-screen font-display">
            <div className="flex">
                <Sidebar user={user} data={dashboardData} loading={loading} />
                <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
                            <div>
                                <h1 className="text-3xl font-serif text-lux-navy mb-2">Event Calendar</h1>
                                <p className="text-lux-pale/60 text-sm">Visualize your journey to the big day</p>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-sm border border-lux-gold/10 shadow-sm">
                                <button onClick={prevMonth} className="text-lux-navy hover:text-lux-gold transition-colors p-1">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <span className="font-serif text-lg text-lux-navy min-w-[140px] text-center">
                                    {format(currentDate, 'MMMM yyyy')}
                                </span>
                                <button onClick={nextMonth} className="text-lux-navy hover:text-lux-gold transition-colors p-1">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </header>

                        {loading ? (
                            <div className="flex justify-center p-20 text-lux-gold"><span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span></div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border border-lux-gold/10 overflow-hidden">
                                <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                                    {weekDays.map(day => (
                                        <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-widest text-lux-pale/60 border-r border-gray-100 last:border-0">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 border-l border-t border-gray-100 [&>div]:border-b [&>div]:border-r">
                                    {days}
                                </div>
                            </div>
                        )}
                        
                        {!loading && timeline.length === 0 && !weddingDate && (
                            <div className="mt-8 text-center bg-lux-navy/5 border border-lux-navy/10 rounded-lg p-6">
                                <span className="material-symbols-outlined text-3xl text-lux-navy/30 mb-2">event_available</span>
                                <p className="text-lux-navy text-sm">Your calendar is currently empty.</p>
                                <p className="text-lux-navy/50 text-xs mt-1">Book vendors or set your wedding date in your profile to see events populate here automatically!</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Calendar;
