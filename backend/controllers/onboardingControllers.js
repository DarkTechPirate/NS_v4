const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");
const Venue = require("../models/venueModel");

exports.submitOnboarding = async (req, res) => {
    try {
        const { role, details } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role;
        user.onboardingComplete = true;

        if (role === "vendor") {
            const vendor = new Vendor({
                ownerId: user._id,
                name: details.name,
                category: details.category || "General",
                priceRate: details.priceRate || "0",
                location: details.location || "TBD",
                description: details.description || "",
            });
            await vendor.save();
            user.roleModel = 'Vendor';
            user.roleSpecificId = vendor._id;
        } else if (role === "venue") {
            const venue = new Venue({
                ownerId: user._id,
                name: details.name,
                capacity: details.capacity || 0,
                priceRate: details.priceRate || "0",
                location: details.location || "TBD",
                description: details.description || "",
            });
            await venue.save();
            user.roleModel = 'Venue';
            user.roleSpecificId = venue._id;
        } else {
            if (details.phone) user.phone = details.phone;
            user.roleModel = undefined;
            user.roleSpecificId = undefined;
        }

        await user.save();

        res.status(200).json({ message: "Onboarding completed successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during onboarding" });
    }
};

exports.getOnboardingStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            onboardingComplete: user.onboardingComplete,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
