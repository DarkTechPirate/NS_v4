const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: function requiredOwnerId() {
                return !this.source || this.source.type !== "google_places";
            },
        },
        name: { type: String, required: true },
        category: { type: String, required: true },
        priceRate: { type: String, required: true }, // e.g. "From $8,000" or numeric
        location: { type: String, required: true },
        district: { type: String },
        locality: { type: String },
        state: { type: String, default: "Tamil Nadu" },
        country: { type: String, default: "India" },
        geo: {
            lat: { type: Number },
            lng: { type: Number },
        },
        website: { type: String },
        contactPhone: { type: String },
        googleMapsUrl: { type: String },
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        images: [{ type: String }],
        coverImage: { type: String },
        verified: { type: Boolean, default: false },
        description: { type: String },
        source: {
            type: {
                type: String,
                enum: ["manual", "google_places"],
                default: "manual",
            },
            externalId: { type: String },
            businessStatus: { type: String },
            focusKeys: [{ type: String }],
            searchTerms: [{ type: String }],
            lastSyncedAt: { type: Date },
        },
        services: [
            {
                name: String,
                price: String,
            }
        ]
    },
    { timestamps: true }
);

VendorSchema.index({ "source.type": 1, "source.externalId": 1 });

module.exports = mongoose.model("Vendor", VendorSchema);
