const cron = require("node-cron");
const { syncGooglePlacesWeddingVendors } = require("./googlePlacesVendorSyncService");

const parseList = (value) => {
    if (!value) return [];
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const parseBoolean = (value, fallback = false) => {
    if (value === undefined || value === null || value === "") return fallback;
    return ["1", "true", "yes", "y", "on"].includes(String(value).toLowerCase());
};

const startVendorSyncScheduler = () => {
    const enabled = parseBoolean(process.env.ENABLE_VENDOR_SYNC_CRON, false);
    if (!enabled) {
        console.log("[VendorSyncCron] Disabled. Set ENABLE_VENDOR_SYNC_CRON=true to enable.");
        return null;
    }

    if (!process.env.GOOGLE_PLACES_API_KEY) {
        console.warn("[VendorSyncCron] GOOGLE_PLACES_API_KEY missing. Scheduler not started.");
        return null;
    }

    const schedule = process.env.VENDOR_SYNC_CRON_SCHEDULE || "30 2 * * *";
    if (!cron.validate(schedule)) {
        console.error(`[VendorSyncCron] Invalid cron schedule: ${schedule}`);
        return null;
    }

    const timezone = process.env.VENDOR_SYNC_TIMEZONE || "Asia/Kolkata";
    const envFocusKeys = parseList(process.env.VENDOR_SYNC_FOCUS_KEYS);
    const focusKeys = envFocusKeys.length ? envFocusKeys : ["wedding-photography", "wedding-cards"];
    const districts = parseList(process.env.VENDOR_SYNC_DISTRICTS);
    const includeBroadKeywords = parseBoolean(process.env.VENDOR_SYNC_INCLUDE_BROAD, false);
    const maxQueries = Number(process.env.VENDOR_SYNC_MAX_QUERIES || 250);
    const maxResultsPerQuery = Number(process.env.VENDOR_SYNC_MAX_RESULTS_PER_QUERY || 8);

    let syncInProgress = false;

    const task = cron.schedule(
        schedule,
        async () => {
            if (syncInProgress) {
                console.log("[VendorSyncCron] Previous sync is still running, skipping this tick.");
                return;
            }

            syncInProgress = true;
            console.log("[VendorSyncCron] Starting scheduled sync...");

            try {
                const result = await syncGooglePlacesWeddingVendors({
                    focusKeys,
                    districts,
                    includeBroadKeywords,
                    dryRun: false,
                    maxQueries,
                    maxResultsPerQuery,
                });

                console.log(
                    `[VendorSyncCron] Done. Queries=${result.queriesProcessed}, Unique=${result.uniqueCandidates}, Created=${result.created}, Updated=${result.updated}, Failed=${result.failed}`
                );
            } catch (error) {
                console.error("[VendorSyncCron] Failed:", error.message);
            } finally {
                syncInProgress = false;
            }
        },
        { timezone }
    );

    console.log(`[VendorSyncCron] Scheduled with '${schedule}' (${timezone}).`);
    return task;
};

module.exports = {
    startVendorSyncScheduler,
};
