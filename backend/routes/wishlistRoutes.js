const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const wishlistControllers = require("../controllers/wishlistControllers");

router.post("/", protect(), wishlistControllers.addToWishlist);
router.delete("/:providerId", protect(), wishlistControllers.removeFromWishlist);
router.get("/", protect(), wishlistControllers.getWishlist);

module.exports = router;
