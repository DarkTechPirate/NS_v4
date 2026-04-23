const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: process.env.COOKIE_DOMAIN || ".nammasambandhi.com",
    };

    res.cookie("token", token, options);
    return token;
};

module.exports = generateTokenAndSetCookie;
