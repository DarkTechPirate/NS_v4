const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
    getAllVendors,
    getVendorById,
    createVendor,
    updateVendor,
    uploadVendorImage,
    getVendorSyncCatalog,
    getTamilNaduWeddingSearchPlan,
    syncGoogleWeddingVendors,
} = require("../controllers/vendorControllers");
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
        cb(null, `vendor-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

router.route("/")
    .get(getAllVendors)
    .post(protect({ vendor: true }), createVendor);

router.get("/sync/catalog", getVendorSyncCatalog);
router.get("/sync/search-plan", getTamilNaduWeddingSearchPlan);
router.post("/sync/google", protect({ admin: true }), syncGoogleWeddingVendors);

router.route("/:id")
    .get(getVendorById)
    .put(protect({ vendor: true }), updateVendor);

router.post("/:id/image", protect({ vendor: true }), upload.single("image"), uploadVendorImage);

module.exports = router;
