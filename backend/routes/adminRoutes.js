const express = require("express");
const { getPlatformStats, getAllProviders, verifyProvider } = require("../controllers/adminControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect({ admin: true })); // All routes require admin

router.get("/stats", getPlatformStats);
router.get("/providers", getAllProviders);
router.put("/providers/verify", verifyProvider);

module.exports = router;
