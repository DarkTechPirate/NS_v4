const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { enqueueMedia } = require("../services/mediaService");

const isValidIndianPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const isPasswordStrong = (password) => {
    return password.length >= 6; // Simplified for demo
};

exports.PersonalInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, phone, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (fullName && fullName.trim().length > 0) {
            user.fullname = fullName.trim();
        }

        if (phone) {
            const cleanPhone = phone.toString().replace(/\D/g, "");
            if (!isValidIndianPhone(cleanPhone)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Indian mobile number."
                });
            }
            user.phone = cleanPhone;
        }

        if (password && password.length > 0) {
            // Simplified strength check
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // Immediate update for the UI if worker isn't running
        // In production with queue, this might just update status
        // But let's set the path directly for immediate feedback if using local storage
        const user = await User.findById(req.user._id);
        // Construct local public URL - assuming static serve
        // Multer saves to public/uploads/filename
        // We need to serve this folder.
        const fileUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
        user.profilePicture = fileUrl;
        await user.save();

        await enqueueMedia(req.file, req.user._id, "User", "profilePicture");

        res.status(200).json({
            success: true,
            message: "Profile picture upload started.",
            user: { ...user.toObject(), profilePicture: fileUrl }
        });
    } catch (error) {
        console.error("Profile Upload Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
