const Booking = require("../models/bookingModel");

exports.createBooking = async (req, res) => {
    try {
        req.body.customerId = req.user._id;
        const booking = await Booking.create(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customerId: req.user._id })
            .populate("providerId", "name coverImage location")
            .sort({ createdAt: -1 });
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getProviderBookings = async (req, res) => {
    try {
        // Find bookings where the providerId matches vendors/venues owned by the user
        // This requires an aggregation or two steps. For simplicity now, if we pass providerId:
        const { providerId } = req.params;
        const bookings = await Booking.find({ providerId })
            .populate("customerId", "fullname email phone")
            .sort({ createdAt: -1 });
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        res.json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
