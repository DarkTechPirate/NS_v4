const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

exports.Signup = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword, phone } = req.body;

        const finalUsername = username || email.split("@")[0];
        const finalFullname = fullname || "User";

        if (!email || !password || !finalUsername) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullname: finalFullname,
            username: finalUsername,
            email,
            password: hashedPassword,
            phone,
        });

        generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                username: newUser.username,
                onboardingComplete: false,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                username: user.username,
                onboardingComplete: user.onboardingComplete || false,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.Logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};

exports.Me = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -__v -updatedAt");
    res.status(200).json({
        success: true,
        user,
    });
};

exports.resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "No account found with this email" });

        // Mock reset
        return res.status(200).json({
            success: true,
            message: "Password reset instructions sent to email",
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
