const express = require("express");
const router = express.Router();
const minio = require("../config/minio");

const BUCKET = process.env.MINIO_BUCKET_NAME || "velotriz";

router.get("/:model/:filename", async (req, res) => {
    try {
        const { model, filename } = req.params;
        const objectKey = `${model}/${filename}`;

        // Get object stream from MinIO
        const dataStream = await minio.getObject(BUCKET, objectKey);
        
        // Set appropriate content type (assuming WebP as per worker)
        res.setHeader("Content-Type", "image/webp");
        res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

        dataStream.pipe(res);
    } catch (err) {
        // If not found in MinIO, it might still be local or missing
        if (err.code === 'NoSuchKey') {
            return res.status(404).send("Image not found");
        }
        console.error("Media Serve Error:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
