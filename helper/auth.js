const jwt = require("jsonwebtoken");
const jwtSecret = "jwtSecret";
const Users = require("../services/users/users.model");

exports.createToken = (payload) => {
    console.log("🚀 ~ file: auth.js:6 ~ payload:", payload);
    return jwt.sign(payload, "codevengersRock");
};

const verifyJWT = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer", "").trim();
        console.log(token);
        const userInfo = jwt.verify(token, "codevengersRock");
        req.user = userInfo;
        return { ...userInfo, verified: true };
    } catch (error) {
        return { verified: false, error: error.message };
    }
};

exports.isAuthorized = (users) => async (req, res, next) => {
    try {
        const isVerify = verifyJWT(req, res);
        console.log("🚀 ~ file: auth.js:23 ~ exports.isAuthorized= ~ isVerify:", isVerify);
        console.log("Users : ", users);
        if (isVerify.verified) {
            if (users.indexOf("governmentOfficial") > -1 && isVerify.role == "governmentOfficial") {
                const user = await Users.findById({ _id: isVerify.id });
                if (!user) {
                    return res.json({ error: true, message: "USER_UNAUTHORIZED" }).status(403);
                } else {
                    next();
                }
            } else if (users.indexOf("citizen") > -1 && isVerify.role == "citizen") {
                const user = await Users.findById({ _id: isVerify.id });
                console.log("🚀 ~ file: auth.js:36 ~ exports.isAuthorized= ~ user:", user);
                if (!user) {
                    return res.json({ error: true, message: "USER_UNAUTHORIZED" }).status(403);
                } else {
                    next();
                }
            } else if (users.indexOf("admin") > -1 && isVerify.role == "admin") {
                const user = await Users.findById({ _id: isVerify.id });
                if (!user) {
                    return res.json({ error: true, message: "USER_UNAUTHORIZED" }).status(403);
                } else {
                    next();
                }
            } else {
                console.log("not allowed");
                return res.json({ error: true, message: "USER_UNAUTHORIZED" }).status(403);
            }
        } else {
            return res.json({ error: true, message: "SESSION_EXPIRED" });
        }
    } catch (error) {
        console.log("🚀 ~ file: auth.js:58 ~ exports.isAuthorized= ~ error:", error);
        return res.json({ error: true, message: "SESSION_EXPIRED" });
    }
};
