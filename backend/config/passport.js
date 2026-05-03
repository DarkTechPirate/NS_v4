const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log("--------------- GOOGLE AUTH START ---------------");

                    const googlePhoto =
                        profile.photos && profile.photos[0]
                            ? profile.photos[0].value
                            : null;

                    // 1. Check existing user by Google ID
                    let user = await User.findOne({ googleId: profile.id });
                    if (user) {
                        console.log("User found by Google ID:", user.email);
                        return done(null, user);
                    }

                    // 2. Check existing user by Email (Account Linking)
                    if (profile.emails && profile.emails.length > 0) {
                        const email = profile.emails[0].value.toLowerCase().trim();
                        user = await User.findOne({ email });
                        if (user) {
                            console.log("User found by Email. Linking account...");
                            user.googleId = profile.id;
                            if (!user.profilePicture && googlePhoto) {
                                user.profilePicture = googlePhoto;
                            }
                            await user.save();
                            return done(null, user);
                        }
                    }

                    // 3. Prepare New User Object
                    const newUserObj = {
                        googleId: profile.id,
                        email:
                            profile.emails && profile.emails[0]
                                ? profile.emails[0].value
                                : "no-email-" + profile.id,
                        fullname:
                            profile.displayName || profile.name?.givenName || "Google User",
                        username:
                            profile.emails && profile.emails[0]
                                ? profile.emails[0].value.split("@")[0]
                                : "user" + Date.now(),
                        password: "google-auth-" + Date.now(),
                        profilePicture: googlePhoto,
                    };

                    const newUser = await User.create(newUserObj);
                    console.log("USER CREATED SUCCESSFULLY:", newUser._id);

                    return done(null, newUser);
                } catch (err) {
                    console.error("CRITICAL DB ERROR:", err);
                    return done(err, null);
                }
            }
        )
    );
};
