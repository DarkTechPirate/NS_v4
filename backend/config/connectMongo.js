const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        const uri =
            process.env.MONGO_DB?.trim() || "mongodb://127.0.0.1:27017/velotriz";

        if (!process.env.MONGO_DB) {
            console.warn(
                "⚠️  MONGO_DB not set — using fallback " + uri
            );
        }

        await mongoose.connect(uri, {
            family: 4,
            maxPoolSize: 50,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            writeConcern: { w: "majority" },
        });

        console.log("✅ MongoDB connected & pool ready");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message || err);
        process.exit(1);
    }
};

module.exports = connectMongo;
