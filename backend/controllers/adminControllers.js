const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");
const Venue = require("../models/venueModel");
const Booking = require("../models/bookingModel");

exports.getPlatformStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const vendorsCount = await Vendor.countDocuments();
        const venuesCount = await Venue.countDocuments();
        const bookingsCount = await Booking.countDocuments();

        const pendingBookings = await Booking.countDocuments({ status: "pending" });

        res.json({
            success: true,
            data: {
                users: usersCount,
                providers: vendorsCount + venuesCount,
                bookings: bookingsCount,
                pendingBookings
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.getAllProviders = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("ownerId", "fullname email").lean();
        const venues = await Venue.find().populate("ownerId", "fullname email").lean();
        
        const formatProvider = (p, type) => ({
            _id: p._id,
            name: p.name,
            type: type,
            category: p.category || 'Venue',
            location: p.location,
            verified: p.verified,
            ownerEmail: p.ownerId?.email,
            createdAt: p.createdAt
        });

        const all = [
            ...vendors.map(v => formatProvider(v, "Vendor")),
            ...venues.map(v => formatProvider(v, "Venue"))
        ].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ success: true, data: all });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.verifyProvider = async (req, res) => {
    try {
        const { providerType, providerId } = req.body;
        const Model = providerType === 'Vendor' ? Vendor : Venue;
        
        const provider = await Model.findByIdAndUpdate(providerId, { verified: true }, { new: true });
        res.json({ success: true, data: provider });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
