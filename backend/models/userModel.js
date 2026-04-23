const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    primary: { type: Boolean, default: false },
    door: String,
    street: String,
    area: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: "India" },
    location: {
        lat: Number,
        lng: Number
    }
});

const UserSchema = new Schema(
    {
        // --- Core Authentication ---
        fullname: { type: String },
        username: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        phone: { type: String },
        googleId: { type: String, unique: true, sparse: true },
        
        // --- Roles & Permissions ---
        role: { 
            type: String, 
            default: "customer", 
            enum: ["admin", "customer", "staff", "vendor", "venue", "user"] 
        },
        isVerified: { type: Boolean, default: false },
        onboardingComplete: { type: Boolean, default: false },
        
        // --- Basic Profile ---
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        age: { type: Number },
        profilePicture: String,
        profileImages: [{ type: String }],
        
        // --- Matrimony / Extended Personal Details ---
        personalDetails: {
            dob: { type: Date },
            height: { type: String },
            maritalStatus: { type: String },
            religion: { type: String },
            community: { type: String },
            subCaste: { type: String },
            motherTongue: { type: String },
            city: { type: String },
            about: { type: String },
            jathagam: { type: String } // URL to file
        },
        
        careerDetails: {
            education: { type: String },
            fieldOfStudy: { type: String },
            institution: { type: String },
            profession: { type: String },
            employer: { type: String },
            income: { type: String },
            workLocation: { type: String }
        },
        
        familyDetails: {
            fatherName: { type: String },
            fatherOccupation: { type: String },
            motherName: { type: String },
            motherOccupation: { type: String },
            siblings: { type: String },
            familyType: { type: String },
            familyValues: { type: String },
            familyLocation: { type: String }
        },
        
        lifestyleDetails: {
            diet: { type: String },
            drinking: { type: String },
            smoking: { type: String },
            hobbies: [{ type: String }],
            livingArrangement: { type: String }
        },
        
        addresses: [AddressSchema],
        
        preferences: {
            relocate: { type: Boolean, default: false }
        },
        
        // --- Platform Specific (Velotriz / NS_v4) ---
        roleSpecificId: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleModel' },
        roleModel: { type: String, enum: ['Vendor', 'Venue'] },
        overallBudget: { type: Number, default: 0 },
        weddingDate: { type: Date },

        // --- Statistics & Logging ---
        loginStats: {
            loginCount: { type: Number, default: 0 },
            lastLoginAt: { type: Date },
            lastLoginIp: { type: String },
            recentLogins: [{ type: Date }]
        }
    },
    {
        timestamps: true,
    }
);

// Index for email search (the user suggested Case-Insensitive Regex, but a lowercase unique index is better)
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
