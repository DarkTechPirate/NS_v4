const Venue = require("../models/venueModel");

exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json({ success: true, count: venues.length, data: venues });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ success: false, message: "Venue not found" });
        res.json({ success: true, data: venue });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.createVenue = async (req, res) => {
    try {
        req.body.ownerId = req.user._id;
        const venue = await Venue.create(req.body);
        res.status(201).json({ success: true, data: venue });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateVenue = async (req, res) => {
    try {
        let venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ success: false, message: "Venue not found" });

        if (venue.ownerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json({ success: true, data: venue });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.uploadVenueImage = async (req, res) => {
    try {
        let venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ success: false, message: "Venue not found" });

        if (venue.ownerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }

        const imageUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
        
        venue.images.push(imageUrl);
        
        if (!venue.coverImage) {
            venue.coverImage = imageUrl;
        }

        await venue.save();
        res.json({ success: true, data: venue });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
