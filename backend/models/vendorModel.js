const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        category: { type: String, required: true },
        priceRate: { type: String, required: true }, // e.g. "From $8,000" or numeric
        location: { type: String, required: true },
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        images: [{ type: String }],
        coverImage: { type: String },
        verified: { type: Boolean, default: false },
        description: { type: String },
        services: [
            {
                name: String,
                price: String,
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
