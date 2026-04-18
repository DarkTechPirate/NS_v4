const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getAllVenues, getVenueById, createVenue, updateVenue, uploadVenueImage } = require("../controllers/venueControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const uploadDir = "public/uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `venue-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

router.route("/")
    .get(getAllVenues)
    .post(protect({ vendor: true }), createVenue); // For simplicity, using vendor role for venue owners too

router.route("/:id")
    .get(getVenueById)
    .put(protect({ vendor: true }), updateVenue);

router.post("/:id/image", protect({ vendor: true }), upload.single("image"), uploadVenueImage);

module.exports = router;
