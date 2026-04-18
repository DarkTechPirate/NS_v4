const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/profile", require("./profileRoutes"));
router.use("/vendors", require("./vendorRoutes"));
router.use("/venues", require("./venueRoutes"));
router.use("/bookings", require("./bookingRoutes"));
router.use("/admin", require("./adminRoutes"));
router.use("/messages", require("./messagingRoutes"));
router.use("/onboarding", require("./onboardingRoutes"));
router.use("/wishlist", require("./wishlistRoutes"));

module.exports = router;
