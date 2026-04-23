const Vendor = require("../models/vendorModel");
const {
    buildTamilNaduWeddingSearchPlan,
    getWeddingFocusCatalog,
    normalizeStringArray,
} = require("../services/vendorSearchPlannerService");
const { syncGooglePlacesWeddingVendors } = require("../services/googlePlacesVendorSyncService");

const parseBoolean = (value, defaultValue = false) => {
    if (value === undefined || value === null || value === "") return defaultValue;
    if (typeof value === "boolean") return value;
    const normalized = String(value).toLowerCase();
    return ["1", "true", "yes", "y", "on"].includes(normalized);
};

const parseNumber = (value, defaultValue) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
};

exports.getAllVendors = async (req, res) => {
    try {
        const query = {};
        const categories = normalizeStringArray(req.query.category);
        if (categories.length === 1) query.category = categories[0];
        if (categories.length > 1) query.category = { $in: categories };

        if (req.query.district) query.district = req.query.district;
        if (req.query.locality) query.locality = req.query.locality;
        if (req.query.sourceType) query["source.type"] = req.query.sourceType;

        const focusKeys = normalizeStringArray(req.query.focusKey);
        if (focusKeys.length === 1) query["source.focusKeys"] = focusKeys[0];
        if (focusKeys.length > 1) query["source.focusKeys"] = { $in: focusKeys };

        if (req.query.verified !== undefined) {
            query.verified = parseBoolean(req.query.verified, false);
        }
        
        const sort = {};
        if (req.query.sort === "price-desc") sort.priceRate = -1; // Basic string sort, might need optimization
        if (req.query.sort === "price-asc") sort.priceRate = 1;
        if (req.query.sort === "rating-desc") sort.rating = -1;
        if (req.query.sort === "latest") sort.createdAt = -1;

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
        const isOwnedByUser = vendor.ownerId && vendor.ownerId.toString() === req.user._id.toString();
        if (!isOwnedByUser && req.user.role !== "admin") {
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

        const isOwnedByUser = vendor.ownerId && vendor.ownerId.toString() === req.user._id.toString();
        if (!isOwnedByUser && req.user.role !== "admin") {
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

exports.getVendorSyncCatalog = async (req, res) => {
    try {
        const catalog = getWeddingFocusCatalog();
        res.json({ success: true, data: catalog });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to load sync catalog", error: err.message });
    }
};

exports.getTamilNaduWeddingSearchPlan = async (req, res) => {
    try {
        const plan = buildTamilNaduWeddingSearchPlan({
            focusKeys: normalizeStringArray(req.query.focusKeys || req.query.focusKey),
            districts: normalizeStringArray(req.query.districts || req.query.district),
            includeBroadKeywords: parseBoolean(req.query.includeBroadKeywords, false),
            maxQueries: parseNumber(req.query.maxQueries, undefined),
        });

        res.json({ success: true, data: plan });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to generate search plan", error: err.message });
    }
};

exports.syncGoogleWeddingVendors = async (req, res) => {
    try {
        const input = {
            ...req.query,
            ...req.body,
        };

        const result = await syncGooglePlacesWeddingVendors({
            focusKeys: normalizeStringArray(input.focusKeys || input.focusKey),
            districts: normalizeStringArray(input.districts || input.district),
            includeBroadKeywords: parseBoolean(input.includeBroadKeywords, false),
            dryRun: parseBoolean(input.dryRun, true),
            maxQueries: parseNumber(input.maxQueries, 300),
            maxResultsPerQuery: parseNumber(input.maxResultsPerQuery, 10),
        });

        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Google vendor sync failed", error: err.message });
    }
};
