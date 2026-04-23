const { Worker } = require("bullmq");
const mongoose = require("mongoose");
const { connection } = require("../services/queue");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const minio = require("../config/minio");

sharp.cache(false);

// Models
require("../models/userModel");

const BUCKET = process.env.MINIO_BUCKET_NAME || "nammasambandi";

const worker = new Worker(
    "media-processing",
    async (job) => {
        const {
            fileId,
            filePath,
            mimeType,
            outputDir,
            modelName,
            fieldName,
            operation,
            finalFilename,
        } = job.data;

        console.log(`\n[Worker] 🟢 JOB START`);
        console.log(`[Worker] Model: ${modelName}`);
        console.log(`[Worker] File Path: ${filePath}`);

        const absoluteInputPath = path.resolve(filePath);
        // Use provided finalFilename or generate one from fileId/original
        const filename = finalFilename || `${fileId}-${Date.now()}.webp`;
        const tempOutput = path.join(path.resolve(outputDir), filename);

        if (!fs.existsSync(absoluteInputPath)) {
            console.error(`[Worker] Input file NOT FOUND at ${absoluteInputPath}`);
            return; // Don't throw if file is gone, just finish job
        }

        try {
            console.log(`[Worker][STEP 3] Sharp start: ${absoluteInputPath} -> ${tempOutput}`);

            let pipeline = sharp(absoluteInputPath);

            // Resize if it's a user profile pic (example logic)
            if (modelName === "User" && fieldName !== "personalDetails.jathagam") {
                pipeline = pipeline.resize(500, 500, { fit: "cover" });
            }

            await pipeline.webp({ quality: 80 }).toFile(tempOutput);

            console.log(`[Worker][STEP 3] Sharp done`);

            if (!fs.existsSync(tempOutput) || fs.statSync(tempOutput).size === 0) {
                throw new Error("Sharp output invalid or empty");
            }

            const objectKey = `${modelName.toLowerCase()}/${filename}`;
            console.log(`[Worker][STEP 4] Uploading to MinIO: ${objectKey}`);

            const bucketExists = await minio.bucketExists(BUCKET);
            if (!bucketExists) {
                await minio.makeBucket(BUCKET, 'us-east-1');
            }

            await minio.fPutObject(BUCKET, objectKey, tempOutput, {
                "Content-Type": "image/webp",
            });

            console.log(`[Worker][STEP 4] MinIO upload DONE`);

            const storedPath = `${process.env.BACKEND_URL}/api/media/${objectKey}`;
            const Model = mongoose.model(modelName);

            console.log(`[Worker][STEP 5] Updating Database for ${modelName} ID: ${fileId}`);
            if (operation === "push") {
                await Model.findByIdAndUpdate(fileId, {
                    $push: { [fieldName]: storedPath },
                });
            } else if (operation === "unshift") {
                await Model.findByIdAndUpdate(fileId, {
                    $push: { [fieldName]: { $each: [storedPath], $position: 0 } },
                });
            } else {
                const doc = await Model.findById(fileId);
                if (doc && doc[fieldName]) {
                    const oldPath = doc[fieldName];
                    // If it's a proxy URL, extract the key
                    if (oldPath && oldPath.includes("/api/media/")) {
                        const oldKey = oldPath.split("/api/media/")[1];
                         try {
                            console.log(`[Worker] Deleting old MinIO object: ${oldKey}`);
                            await minio.removeObject(BUCKET, oldKey);
                        } catch (e) {
                            console.warn(`[Worker] Old object delete failed: ${e}`);
                        }
                    }
                }
                const update = { [fieldName]: storedPath };
                await Model.findByIdAndUpdate(fileId, update);
            }

            // SUCCESS CLEANUP
            if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
            if (fs.existsSync(absoluteInputPath)) fs.unlinkSync(absoluteInputPath);

            console.log(`[Worker] 🎉 JOB COMPLETED SUCCESSFULLY`);
            return storedPath;
        } catch (err) {
            console.error(`[Worker ❌ ERROR] ${err.message}`);
            
            // CLEANUP TEMP OUTPUT ALWAYS ON ERROR
            if (fs.existsSync(tempOutput)) {
                try { fs.unlinkSync(tempOutput); } catch { }
            }

            // IF THIS IS THE LAST ATTEMPT, CLEAN UP THE INPUT FILE TOO
            // job.opts.attempts might be set, or we use default
            const maxAttempts = job.opts.attempts || 3;
            if (job.attemptsMade + 1 >= maxAttempts) {
                console.log(`[Worker] Max attempts reached. Cleaning up original input file.`);
                if (fs.existsSync(absoluteInputPath)) {
                    try { fs.unlinkSync(absoluteInputPath); } catch { }
                }
            }

            throw err;
        }
    },
    {
        connection,
        attempts: 3,
        backoff: { type: "exponential", delay: 1000 },
    }
);

console.log("🧵 Media Worker started");
