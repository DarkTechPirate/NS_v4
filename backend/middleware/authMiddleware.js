const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateTokenAndSetCookie = require("../utils/generateToken");

const protect =
    ({ admin = false, staff = false } = {}) =>
        async (req, res, next) => {
            try {
                const token = req.cookies.token;

                if (!token) {
                    return res.status(401).json({ message: "Not authorized, no token" });
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");

                if (!req.user) {
                    return res.status(401).json({ message: "User not found" });
                }

                if (admin && req.user.role !== "admin") {
                    return res.status(403).json({ message: "Not authorized as admin" });
                }

                // Allow admin to access staff routes
                if (staff && req.user.role !== "staff" && req.user.role !== "admin") {
                    return res.status(403).json({ message: "Not authorized as staff" });
                }

                const nowInSeconds = Math.floor(Date.now() / 1000);
                const sevenDaysInSeconds = 7 * 24 * 60 * 60;
                const timeRemaining = decoded.exp - nowInSeconds;

                if (timeRemaining < sevenDaysInSeconds) {
                    generateTokenAndSetCookie(res, req.user._id);
                }

                next();
            } catch (error) {
                console.error("Auth Middleware Error:", error.message);
                res.status(401).json({ message: "Not authorized, invalid token" });
            }
        };

module.exports = { protect };
