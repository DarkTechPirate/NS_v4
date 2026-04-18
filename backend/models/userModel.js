const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        googleId: { type: String, unique: true, sparse: true },
        username: { type: String },
        fullname: { type: String },
        email: { type: String, required: true },
        password: { type: String },
        phone: { type: String },
        createdAt: { type: Date, default: Date.now },
        profilePicture: String,
        role: { type: String, default: "customer", enum: ["admin", "customer", "staff", "vendor", "venue"] },
        onboardingComplete: { type: Boolean, default: false },
        roleSpecificId: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleModel' },
        roleModel: { type: String, enum: ['Vendor', 'Venue'] },
        overallBudget: { type: Number, default: 0 },
        weddingDate: { type: Date }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
