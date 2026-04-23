const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { enqueueMedia } = require("../services/mediaService");
const Booking = require("../models/bookingModel");

const isValidIndianPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const isPasswordStrong = (password) => {
    return password.length >= 6; // Simplified for demo
};

exports.UpdateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const incomingData = req.body;
        const { fullname, phone, password, gender, age, profilePicture } = incomingData;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 1. Basic Fields
        if (fullname) user.fullname = fullname.trim();
        if (gender) user.gender = gender;
        if (age) user.age = Number(age);
        if (profilePicture) user.profilePicture = profilePicture;

        if (phone) {
            const cleanPhone = phone.toString().replace(/\D/g, "");
            if (!isValidIndianPhone(cleanPhone)) {
                return res.status(400).json({ success: false, message: "Invalid Indian mobile number." });
            }
            user.phone = cleanPhone;
        }

        if (password && password.length > 0) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // 2. Universal Merge Strategy for Nested Sections
        const sections = ['personalDetails', 'careerDetails', 'familyDetails', 'lifestyleDetails', 'preferences'];
        sections.forEach(section => {
            if (incomingData[section] && typeof incomingData[section] === 'object') {
                Object.entries(incomingData[section]).forEach(([key, value]) => {
                    // Using Mongoose's .set() for deep paths
                    user.set(`${section}.${key}`, value);
                });
            }
        });

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

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const bookings = await Booking.find({ customerId: userId })
            .populate("providerId", "name coverImage location")
            .sort({ bookingDate: 1 });

        let totalBudgetUsed = 0;
        let pendingInquiries = 0;
        let vendorsBooked = 0;
        const timeline = [];

        bookings.forEach(booking => {
            if (booking.status === "pending") {
                pendingInquiries++;
            } else if (booking.status === "accepted" || booking.status === "completed") {
                vendorsBooked++;
                totalBudgetUsed += (booking.totalAmount || 0);

                if (booking.bookingDate) {
                    timeline.push({
                        title: `Booked ${booking.providerId?.name || "Provider"}`,
                        date: new Date(booking.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        time: new Date(booking.bookingDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                        timestamp: booking.bookingDate
                    });
                }
            }
        });

        timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        let daysToIDo = null;
        if (user.weddingDate) {
            const diffTime = new Date(user.weddingDate).getTime() - new Date().getTime();
            daysToIDo = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
        }

        res.status(200).json({
            success: true,
            dashboard: {
                budgetUsed: totalBudgetUsed,
                overallBudget: user.overallBudget || 0,
                daysToIDo: daysToIDo,
                weddingDate: user.weddingDate,
                vendorsBooked,
                pendingInquiries,
                bookings,
                timeline
            }
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
