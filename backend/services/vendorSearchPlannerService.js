const {
    TAMIL_NADU_LOCATION_MAP,
    TAMIL_NADU_DISTRICTS,
} = require("../data/tamilNaduLocations");
const {
    WEDDING_BUSINESS_KEYWORDS,
    WEDDING_FOCUS_GROUPS,
} = require("../data/weddingVendorKeywords");

const DEFAULT_FOCUS_KEYS = ["wedding-photography", "wedding-cards"];

const normalizeStringArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean).map((item) => String(item).trim());
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const getFocusGroups = (requestedKeys = []) => {
    if (!requestedKeys.length) {
        const defaultSet = new Set(DEFAULT_FOCUS_KEYS.map((item) => item.toLowerCase()));
        return WEDDING_FOCUS_GROUPS.filter((group) => defaultSet.has(group.key.toLowerCase()));
    }

    const keySet = new Set(requestedKeys.map((item) => item.toLowerCase()));
    return WEDDING_FOCUS_GROUPS.filter((group) => keySet.has(group.key.toLowerCase()));
};

const getDistricts = (requestedDistricts = []) => {
    if (!requestedDistricts.length) return TAMIL_NADU_DISTRICTS;

    const districtSet = new Set(requestedDistricts.map((item) => item.toLowerCase()));
    return TAMIL_NADU_DISTRICTS.filter((district) => districtSet.has(district.toLowerCase()));
};

const buildQueryText = ({ term, locality, district }) => {
    const locationText = locality.toLowerCase() === district.toLowerCase()
        ? `${locality}, Tamil Nadu`
        : `${locality}, ${district}, Tamil Nadu`;
    return `${term} in ${locationText}`;
};

const buildTamilNaduWeddingSearchPlan = ({
    focusKeys,
    districts,
    includeBroadKeywords = false,
    maxQueries,
} = {}) => {
    const normalizedFocusKeys = normalizeStringArray(focusKeys);
    const normalizedDistricts = normalizeStringArray(districts);

    const selectedFocusGroups = getFocusGroups(normalizedFocusKeys);
    const selectedDistricts = getDistricts(normalizedDistricts);

    const termsByGroup = selectedFocusGroups.flatMap((group) => {
        return group.queryTerms.map((term) => ({
            focusKey: group.key,
            focusLabel: group.label,
            mappedCategory: group.mappedCategory,
            term,
        }));
    });

    const broadTerms = includeBroadKeywords
        ? WEDDING_BUSINESS_KEYWORDS.map((term) => ({
            focusKey: "all-wedding-services",
            focusLabel: "All Wedding Services",
            mappedCategory: "Wedding Services",
            term,
        }))
        : [];

    const allTerms = [...termsByGroup, ...broadTerms];

    const plan = [];
    for (const district of selectedDistricts) {
        const localities = TAMIL_NADU_LOCATION_MAP[district] || [];
        for (const locality of localities) {
            for (const termConfig of allTerms) {
                plan.push({
                    district,
                    locality,
                    state: "Tamil Nadu",
                    country: "India",
                    ...termConfig,
                    queryText: buildQueryText({ term: termConfig.term, locality, district }),
                });
            }
        }
    }

    const safeMax = Number(maxQueries) > 0 ? Number(maxQueries) : null;
    const limitedPlan = safeMax ? plan.slice(0, safeMax) : plan;

    return {
        generatedAt: new Date().toISOString(),
        totalQueries: limitedPlan.length,
        fullQueryCount: plan.length,
        districtsCovered: selectedDistricts.length,
        focusGroups: selectedFocusGroups.map((group) => ({
            key: group.key,
            label: group.label,
            mappedCategory: group.mappedCategory,
        })),
        includeBroadKeywords,
        queries: limitedPlan,
    };
};

const getWeddingFocusCatalog = () => {
    return {
        districts: TAMIL_NADU_DISTRICTS,
        focusGroups: WEDDING_FOCUS_GROUPS,
        defaultFocusKeys: DEFAULT_FOCUS_KEYS,
        broadKeywords: WEDDING_BUSINESS_KEYWORDS,
    };
};

module.exports = {
    buildTamilNaduWeddingSearchPlan,
    getWeddingFocusCatalog,
    normalizeStringArray,
};
