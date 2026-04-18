const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        providerId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "providerModel"
        },
        providerModel: {
            type: String,
            required: true,
            enum: ["Vendor", "Venue"]
        },
        bookingDate: { type: Date, required: true },
        eventType: { type: String },
        guestCount: { type: Number },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
            default: "pending",
        },
        totalAmount: { type: Number },
        specialRequests: { type: String },
        contactPhone: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
