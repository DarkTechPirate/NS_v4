const Wishlist = require("../models/wishlistModel");

exports.addToWishlist = async (req, res) => {
    try {
        const { providerId, providerModel } = req.body;
        
        const existing = await Wishlist.findOne({ user: req.user._id, provider: providerId });
        if (existing) {
            return res.status(400).json({ message: "Already in wishlist" });
        }

        const wishlistItem = await Wishlist.create({
            user: req.user._id,
            provider: providerId,
            providerModel
        });

        res.status(201).json(wishlistItem);
    } catch (error) {
        console.error("Wishlist Add Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { providerId } = req.params;
        await Wishlist.findOneAndDelete({ user: req.user._id, provider: providerId });
        res.status(200).json({ message: "Removed from wishlist" });
    } catch (error) {
        console.error("Wishlist Remove Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({ user: req.user._id })
            .populate("provider")
            .sort({ createdAt: -1 });
            
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
