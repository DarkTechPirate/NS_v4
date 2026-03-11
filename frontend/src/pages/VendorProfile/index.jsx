import React from 'react';
import ProfileHero from './ProfileHero';
import ProfilePhilosophy from './ProfilePhilosophy';
import ProfilePortfolio from './ProfilePortfolio';
import ProfileServices from './ProfileServices';
import ProfileAvailability from './ProfileAvailability';
import BookingActionBar from './BookingActionBar';

const VendorProfile = () => {
    return (
        <div className="bg-background-dark min-h-screen pb-20">
            <main>
                <ProfileHero />
                <ProfilePhilosophy />
                <ProfilePortfolio />
                <ProfileServices />
                <ProfileAvailability />
            </main>
            <BookingActionBar />
        </div>
    );
};

export default VendorProfile;
