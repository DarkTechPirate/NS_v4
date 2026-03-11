const express = require("express");
const router = express.Router();
const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const generateTokenAndSetCookie = require("../utils/generateToken");
const { protect } = require("../middleware/authMiddleware");
const {
    Login,
    Signup,
    Logout,
    Me,
    resetPassword,
} = require("../controllers/authControllers");
const { findOrCreateGoogleUser } = require("../services/authService");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/me", protect(), Me);
router.post("/reset-password", resetPassword);

router.get(
    "/google",
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),
    (req, res) => {
        generateTokenAndSetCookie(res, req.user._id);
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        res.redirect(clientUrl);
    }
);

router.post("/google/onetap", async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const user = await findOrCreateGoogleUser(payload);
        generateTokenAndSetCookie(res, user._id);
        res.status(200).json({
            success: true,
            user,
            message: "Google One Tap Login Successful",
        });
    } catch (error) {
        console.error("One Tap Error:", error);
        res.status(401).json({ success: false, message: "Invalid Google Token" });
    }
});

module.exports = router;
