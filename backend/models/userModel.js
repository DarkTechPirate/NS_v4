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
        role: { type: String, default: "user", enum: ["admin", "user", "staff", "vendor"] },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
