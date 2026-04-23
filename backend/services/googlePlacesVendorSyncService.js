const Vendor = require("../models/vendorModel");
const {
    buildTamilNaduWeddingSearchPlan,
    normalizeStringArray,
} = require("./vendorSearchPlannerService");

const GOOGLE_TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

const toPhotoUrl = (photoReference, apiKey) => {
    if (!photoReference || !apiKey) return null;
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${encodeURIComponent(photoReference)}&key=${encodeURIComponent(apiKey)}`;
};

const normalizeCategory = (candidate) => {
    const focusKey = candidate.focusKeys[0];

    if (focusKey === "wedding-photography") return "Photographer";
    if (focusKey === "wedding-cards") return "Invitation Cards";
    return candidate.mappedCategory || "Wedding Services";
};

const mapPlaceToCandidate = (place, queryPlanItem, apiKey) => {
    const photoReference = place.photos?.[0]?.photo_reference;

    return {
        externalId: place.place_id,
        name: place.name,
        location: place.formatted_address || `${queryPlanItem.locality}, ${queryPlanItem.district}, Tamil Nadu`,
        district: queryPlanItem.district,
        locality: queryPlanItem.locality,
        state: "Tamil Nadu",
        country: "India",
        rating: Number(place.rating || 0),
        ratingCount: Number(place.user_ratings_total || 0),
        coverImage: toPhotoUrl(photoReference, apiKey),
        images: photoReference ? [toPhotoUrl(photoReference, apiKey)] : [],
        googleMapsUrl: place.place_id ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}` : "",
        geo: {
            lat: Number(place.geometry?.location?.lat || 0),
            lng: Number(place.geometry?.location?.lng || 0),
        },
        businessStatus: place.business_status || "OPERATIONAL",
        focusKeys: [queryPlanItem.focusKey],
        searchTerms: [queryPlanItem.term],
        mappedCategory: queryPlanItem.mappedCategory,
    };
};

const mergeCandidate = (existing, incoming) => {
    const focusSet = new Set([...(existing.focusKeys || []), ...(incoming.focusKeys || [])]);
    const termSet = new Set([...(existing.searchTerms || []), ...(incoming.searchTerms || [])]);

    return {
        ...existing,
        ...incoming,
        rating: Math.max(existing.rating || 0, incoming.rating || 0),
        ratingCount: Math.max(existing.ratingCount || 0, incoming.ratingCount || 0),
        coverImage: existing.coverImage || incoming.coverImage,
        images: Array.from(new Set([...(existing.images || []), ...(incoming.images || [])])).filter(Boolean),
        focusKeys: Array.from(focusSet),
        searchTerms: Array.from(termSet),
        mappedCategory: existing.mappedCategory || incoming.mappedCategory,
    };
};

const fetchGoogleTextSearch = async ({ apiKey, queryText }) => {
    const requestUrl = `${GOOGLE_TEXT_SEARCH_URL}?query=${encodeURIComponent(queryText)}&region=in&language=en&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(requestUrl);
    if (!response.ok) {
        throw new Error(`Google Places API HTTP error: ${response.status}`);
    }

    const payload = await response.json();
    if (payload.status && payload.status !== "OK" && payload.status !== "ZERO_RESULTS") {
        throw new Error(`Google Places API status ${payload.status}: ${payload.error_message || "Unknown error"}`);
    }

    return payload.results || [];
};

const upsertCandidateAsVendor = async (candidate) => {
    const filter = {
        "source.type": "google_places",
        "source.externalId": candidate.externalId,
    };

    const existing = await Vendor.findOne(filter);

    if (existing) {
        const nextFocusKeys = Array.from(new Set([...(existing.source?.focusKeys || []), ...candidate.focusKeys]));
        const nextSearchTerms = Array.from(new Set([...(existing.source?.searchTerms || []), ...candidate.searchTerms]));

        existing.name = candidate.name || existing.name;
        existing.category = existing.category || normalizeCategory(candidate);
        existing.location = candidate.location || existing.location;
        existing.rating = candidate.rating;
        existing.ratingCount = candidate.ratingCount;
        existing.coverImage = existing.coverImage || candidate.coverImage;
        existing.images = Array.from(new Set([...(existing.images || []), ...(candidate.images || [])])).filter(Boolean);
        existing.verified = true;
        existing.district = candidate.district;
        existing.locality = candidate.locality;
        existing.state = candidate.state;
        existing.country = candidate.country;
        existing.geo = candidate.geo;
        existing.googleMapsUrl = candidate.googleMapsUrl || existing.googleMapsUrl;
        existing.source = {
            ...(existing.source || {}),
            type: "google_places",
            externalId: candidate.externalId,
            businessStatus: candidate.businessStatus,
            focusKeys: nextFocusKeys,
            searchTerms: nextSearchTerms,
            lastSyncedAt: new Date(),
        };

        await existing.save();
        return "updated";
    }

    await Vendor.create({
        name: candidate.name,
        category: normalizeCategory(candidate),
        priceRate: "Contact for quote",
        location: candidate.location,
        rating: candidate.rating,
        ratingCount: candidate.ratingCount,
        images: candidate.images,
        coverImage: candidate.coverImage,
        verified: true,
        district: candidate.district,
        locality: candidate.locality,
        state: candidate.state,
        country: candidate.country,
        geo: candidate.geo,
        googleMapsUrl: candidate.googleMapsUrl,
        source: {
            type: "google_places",
            externalId: candidate.externalId,
            businessStatus: candidate.businessStatus,
            focusKeys: candidate.focusKeys,
            searchTerms: candidate.searchTerms,
            lastSyncedAt: new Date(),
        },
    });

    return "created";
};

const syncGooglePlacesWeddingVendors = async ({
    focusKeys,
    districts,
    includeBroadKeywords = false,
    dryRun = true,
    maxQueries = 300,
    maxResultsPerQuery = 10,
} = {}) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_PLACES_API_KEY is missing. Add it to backend/.env before running sync.");
    }

    const requestedFocusKeys = normalizeStringArray(focusKeys);
    const requestedDistricts = normalizeStringArray(districts);

    const searchPlan = buildTamilNaduWeddingSearchPlan({
        focusKeys: requestedFocusKeys,
        districts: requestedDistricts,
        includeBroadKeywords,
        maxQueries,
    });

    const candidateMap = new Map();
    let queriesProcessed = 0;
    let placeResultsSeen = 0;

    for (const queryItem of searchPlan.queries) {
        const places = await fetchGoogleTextSearch({ apiKey, queryText: queryItem.queryText });
        const cappedResults = places.slice(0, Number(maxResultsPerQuery) || 10);

        queriesProcessed += 1;
        placeResultsSeen += cappedResults.length;

        for (const place of cappedResults) {
            if (!place.place_id) continue;

            const incomingCandidate = mapPlaceToCandidate(place, queryItem, apiKey);
            const currentCandidate = candidateMap.get(place.place_id);

            if (!currentCandidate) {
                candidateMap.set(place.place_id, incomingCandidate);
            } else {
                candidateMap.set(place.place_id, mergeCandidate(currentCandidate, incomingCandidate));
            }
        }
    }

    const candidates = Array.from(candidateMap.values());

    if (dryRun) {
        return {
            dryRun: true,
            queriesProcessed,
            totalPlannedQueries: searchPlan.totalQueries,
            placeResultsSeen,
            uniqueCandidates: candidates.length,
            sampleCandidates: candidates.slice(0, 20),
            searchPlanSummary: {
                districtsCovered: searchPlan.districtsCovered,
                focusGroups: searchPlan.focusGroups,
                includeBroadKeywords: searchPlan.includeBroadKeywords,
            },
        };
    }

    let created = 0;
    let updated = 0;
    let failed = 0;

    for (const candidate of candidates) {
        try {
            const action = await upsertCandidateAsVendor(candidate);
            if (action === "created") created += 1;
            if (action === "updated") updated += 1;
        } catch (error) {
            failed += 1;
        }
    }

    return {
        dryRun: false,
        queriesProcessed,
        totalPlannedQueries: searchPlan.totalQueries,
        placeResultsSeen,
        uniqueCandidates: candidates.length,
        created,
        updated,
        failed,
        searchPlanSummary: {
            districtsCovered: searchPlan.districtsCovered,
            focusGroups: searchPlan.focusGroups,
            includeBroadKeywords: searchPlan.includeBroadKeywords,
        },
    };
};

module.exports = {
    syncGooglePlacesWeddingVendors,
};
