const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        provider: { type: Schema.Types.ObjectId, required: true, refPath: "providerModel" },
        providerModel: { type: String, enum: ["Vendor", "Venue"], required: true }
    },
    { timestamps: true }
);

WishlistSchema.index({ user: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", WishlistSchema);
