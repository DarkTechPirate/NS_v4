const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectMongo = require("../config/connectMongo");
const { mediaQueue } = require("../services/queue");

const startWorkers = async () => {
    try {
        console.log("🔄 Connecting to Database for Workers...");

        await connectMongo();
        console.log("✅ Database connected");

        // Retry failed jobs on startup
        const failedJobs = await mediaQueue.getJobs(["failed"]);
        if (failedJobs.length > 0) {
            console.log(`⚠️ Found ${failedJobs.length} failed jobs. Retrying...`);
            for (const job of failedJobs) {
                await job.retry();
            }
        }

        console.log("🔄 Starting worker processor...");

        // Initialize workers
        require("./mediaWorker");
        
        // Match worker can be added here once models are ready
        // const { initMatchWorker } = require("./matchWorker");
        // initMatchWorker();

        console.log("✅ Workers initialized and listening for jobs...");
    } catch (error) {
        console.error("❌ Worker startup failed:", error);
        process.exit(1);
    }
};

startWorkers();
