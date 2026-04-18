const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, required: true },
        capacity: { type: Number },
        priceRate: { type: String, required: true },
        location: { type: String, required: true },
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        amenities: [{ type: String }],
        images: [{ type: String }],
        coverImage: { type: String },
        verified: { type: Boolean, default: false },
        description: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Venue", VenueSchema);
