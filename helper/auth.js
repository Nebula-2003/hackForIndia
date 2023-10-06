const jwt = require("jsonwebtoken");
const jwtSecret = "jwtSecret";
const Users = require("../services/users/users.model");

exports.createToken = (payload) => {
    return jwt.sign(payload, jwtSecret);
};

exports.isAuthorized = (users) => async (req, res, next) => {
    const isVerify = verifyJWT(req, res);
    console.log("Users : ", users);
    if (isVerify) {
        if (users.indexOf("governmentOfficial") > -1 && isVerify.role == "governmentOfficial") {
            const user = await Users.findById({ _id: isVerify.id });
            if (!user) {
                return res.json({ error: true, message: "USER_UNAUTHORIZED" }).status(403);
            } else {
                next();
            }
        } else if (users.indexOf("citizen") > -1 && isVerify.role == "admin") {
            const user = await Users.findById({ _id: isVerify.id });
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
        return res.json("SESSION_EXPIRED");
    }
};
