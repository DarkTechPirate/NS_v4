import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingSummary from './BookingSummary';
import StepDate from './StepDate';
import StepPackage from './StepPackage';
import StepDetails from './StepDetails';

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleNext = () => {
        if (step === 3) {
            navigate('/booking/success');
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <div className="bg-background-light min-h-screen">
            <div className="pt-12 pb-20 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Progress Header */}
                        <div className="mb-10">
                            <h1 className="text-4xl font-serif text-lux-navy mb-4">Request a Booking</h1>
                            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-lux-navy/40">
                                <span className={step === 1 ? 'text-lux-gold' : ''}>01 Date</span>
                                <span className="h-[1px] w-8 bg-lux-navy/10"></span>
                                <span className={step === 2 ? 'text-lux-gold' : ''}>02 Collection</span>
                                <span className="h-[1px] w-8 bg-lux-navy/10"></span>
                                <span className={step === 3 ? 'text-lux-gold' : ''}>03 Details</span>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="mb-12 min-h-[400px]">
                            {step === 1 && <StepDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}
                            {step === 2 && <StepPackage selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />}
                            {step === 3 && <StepDetails />}
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex justify-between pt-8 border-t border-lux-gold/10">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-colors ${step === 1 ? 'text-lux-navy/20 cursor-not-allowed' : 'text-lux-navy hover:text-lux-gold'}`}
                            >
                                <span className="material-symbols-outlined text-sm">west</span>
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-lux-gold text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-lux-navy transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-px"
                            >
                                {step === 3 ? 'Confirm Request' : 'Continue'}
                                <span className="material-symbols-outlined text-sm">east</span>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <BookingSummary
                            step={step}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            selectedPackage={selectedPackage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
