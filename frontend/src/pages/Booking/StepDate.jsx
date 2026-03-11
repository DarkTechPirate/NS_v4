import React from 'react';

const StepDate = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-serif text-lux-navy mb-6">Select Date & Time</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar Placeholder */}
                <div className="bg-white border border-lux-gold/20 rounded p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lux-navy">May 2024</h4>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-lux-pale/20 rounded"><span className="material-symbols-outlined text-lux-gold">chevron_left</span></button>
                            <button className="p-1 hover:bg-lux-pale/20 rounded"><span className="material-symbols-outlined text-lux-gold">chevron_right</span></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-lux-pale/60">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {[...Array(30).keys()].map(i => {
                            const day = i + 1;
                            const isAvailable = [5, 12, 19, 20, 26].includes(day);
                            const isSelected = selectedDate === `May ${day}, 2024`;
                            return (
                                <button
                                    key={day}
                                    onClick={() => isAvailable && setSelectedDate(`May ${day}, 2024`)}
                                    disabled={!isAvailable}
                                    className={`aspect-square flex items-center justify-center rounded-full transition-all ${isSelected ? 'bg-lux-gold text-white shadow-lg scale-110' :
                                            isAvailable ? 'hover:bg-lux-gold/10 text-lux-navy font-medium' : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {day}
                                </button>
                            )
                        })}
                    </div>
                    <div className="mt-4 flex gap-4 text-xs justify-center">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-lux-gold"></div> Selected</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-lux-navy"></div> Available</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300"></div> Booked</div>
                    </div>
                </div>

                {/* Time Slots */}
                <div>
                    <h4 className="font-bold text-lux-navy mb-4">Available Times</h4>
                    {selectedDate ? (
                        <div className="grid grid-cols-2 gap-3">
                            {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 border rounded text-sm transition-all ${selectedTime === time
                                            ? 'border-lux-gold bg-lux-gold text-white shadow-md'
                                            : 'border-lux-gold/20 text-lux-navy hover:border-lux-gold hover:text-lux-gold'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-lux-pale/30 rounded text-lux-pale/50">
                            <span className="material-symbols-outlined text-4xl mb-2">calendar_today</span>
                            <p>Select a date to view times</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepDate;
