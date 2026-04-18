const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const onboardingControllers = require("../controllers/onboardingControllers");

router.post("/", protect(), onboardingControllers.submitOnboarding);
router.get("/status", protect(), onboardingControllers.getOnboardingStatus);

module.exports = router;
