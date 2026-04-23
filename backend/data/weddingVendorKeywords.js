const WEDDING_BUSINESS_KEYWORDS = [
    "wedding planner",
    "marriage decorator",
    "bridal makeup artist",
    "wedding caterer",
    "wedding return gifts",
    "mehndi artist",
    "wedding stage decoration",
    "wedding jewelry rental",
    "marriage event management",
    "bridal studio",
];

const WEDDING_FOCUS_GROUPS = [
    {
        key: "wedding-photography",
        label: "Wedding Photography",
        mappedCategory: "Photographer",
        queryTerms: [
            "wedding photographer",
            "candid wedding photographer",
            "wedding videographer",
            "pre wedding shoot photographer",
            "wedding cinematic videography",
        ],
    },
    {
        key: "wedding-cards",
        label: "Wedding Cards",
        mappedCategory: "Invitation Cards",
        queryTerms: [
            "wedding card shop",
            "wedding invitation printing",
            "digital wedding invitation designer",
            "tamil wedding invitation card",
            "custom wedding card designer",
        ],
    },
    {
        key: "wedding-core-services",
        label: "Wedding Core Services",
        mappedCategory: "Wedding Services",
        queryTerms: [
            "wedding planner",
            "marriage decorator",
            "bridal makeup artist",
            "wedding caterer",
            "marriage event management",
        ],
    },
];

module.exports = {
    WEDDING_BUSINESS_KEYWORDS,
    WEDDING_FOCUS_GROUPS,
};
