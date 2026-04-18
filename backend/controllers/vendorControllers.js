const Vendor = require("../models/vendorModel");

exports.getAllVendors = async (req, res) => {
    try {
        const query = {};
        if (req.query.category) query.category = req.query.category;
        
        const sort = {};
        if (req.query.sort === "price-desc") sort.priceRate = -1; // Basic string sort, might need optimization
        if (req.query.sort === "price-asc") sort.priceRate = 1;

        const vendors = await Vendor.find(query).sort(sort);
        res.json({ success: true, count: vendors.length, data: vendors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
        res.json({ success: true, data: vendor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.createVendor = async (req, res) => {
    try {
        req.body.ownerId = req.user._id;
        const vendor = await Vendor.create(req.body);
        res.status(201).json({ success: true, data: vendor });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        let vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });

        // Make sure user owns the vendor or is admin
        if (vendor.ownerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized to update this vendor" });
        }

        vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json({ success: true, data: vendor });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.uploadVendorImage = async (req, res) => {
    try {
        let vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });

        if (vendor.ownerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }

        const imageUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
        
        vendor.images.push(imageUrl);
        
        // If it's the first image, set it as cover image too
        if (!vendor.coverImage) {
            vendor.coverImage = imageUrl;
        }

        await vendor.save();
        res.json({ success: true, data: vendor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
