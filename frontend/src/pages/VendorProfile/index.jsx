import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorById } from '../../services/vendorService';
import ProfileHero from './ProfileHero';
import ProfilePhilosophy from './ProfilePhilosophy';
import ProfilePortfolio from './ProfilePortfolio';
import ProfileServices from './ProfileServices';
import ProfileAvailability from './ProfileAvailability';
import BookingActionBar from './BookingActionBar';

const VendorProfile = () => {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await getVendorById(id);
                if (res.success) setVendor(res.data);
            } catch (err) {
                console.error("Failed to fetch vendor", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVendor();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-background-dark flex items-center justify-center text-lux-pale">Loading Profile...</div>;
    }

    if (!vendor) {
        return <div className="min-h-screen bg-background-dark flex items-center justify-center text-lux-pale">Vendor not found</div>;
    }

    return (
        <div className="bg-background-dark min-h-screen pb-20">
            <main>
                <ProfileHero vendor={vendor} />
                <ProfilePhilosophy vendor={vendor} />
                <ProfilePortfolio vendor={vendor} />
                <ProfileServices vendor={vendor} />
                <ProfileAvailability vendor={vendor} />
            </main>
            <BookingActionBar vendor={vendor} providerType="Vendor" />
        </div>
    );
};

export default VendorProfile;
