const Service = require("./users.services");
const password = require("../../helper/password");
const auth = require("../../helper/auth");

module.exports = {
    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            req.body.password = await password.hash(req.body.password);
            if (req.files != undefined && req.files.image != undefined) {
                req.body.image = process.env.PUB_FILE + "/userProfile/" + req.files.image[0].filename;
                console.log("🚀 ~ file: users.controller.js:14 ~ create: ~  req.body.image:", req.body.image);
            }

            let data = await Service.add(req.body);
            if (data) {
                let token = auth.createToken({ id: data._id, role: data.role });
                console.log("🚀 ~ file: users.controller.js:21 ~ create: ~ { id: data._id, role: data.role }):", data._id, data.role);
                if (token) {
                    return res.status(200).json({ error: false, message: "Success", token: token, ...data._doc });
                } else {
                    throw new Error("Something went wrong, Please try again");
                }
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: users.controller.js:18 ~ create: ~ error:", error);
            if (error.code === 11000) {
                return res.json({ error: true, status: 400, message: `Email : ${error.keyValue.email} already exists` });
            }
            return res.json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * Login
     */
    login: async (req, res, next) => {
        try {
            let user = await Service.findOneByQuery({ email: req.body.email });
            if (!user) {
                return res.json({ error: true, status: 400, message: "User not found" });
            }
            let isMatch = await password.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.json({ error: true, status: 401, message: "Password not match" });
            }
            let token = auth.createToken({ id: user._id, role: user.role });
            if (token) {
                return res.status(200).json({ error: false, message: "Success", token: token, ...user });
            } else {
                throw new Error("Something went wrong, Please try again");
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:28 ~ login: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },

    /**
     * Get
     */

    get: async (req, res, next) => {
        try {
            let data = await Service.get(req.params.id);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.status(400).json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },

    /**
     * List
     */

    list: async (req, res, next) => {
        try {
            let query = {};
            let listAll = await Service.list(query);
            if (listAll) {
                return res.status(200).json({ error: false, message: "Success", data: listAll });
            } else {
                return res.json({ error: false, status: 200, data: [], message: "No data found" });
            }
        } catch (error) {
            return res.status(400).json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },

    /**
     * Update
     */

    update: async (req, res, next) => {
        try {
            let update = await Service.update(req.params.id, req.body);
            if (req.files != undefined && req.files.image != undefined) {
                req.body.image = process.env.PUB_FILE + "/userProfile/" + req.files.image[0].filename;
                console.log("🚀 ~ file: users.controller.js:14 ~ create: ~  req.body.image:", req.body.image);
            }
            if (update) {
                return res.json({ error: false, status: 200, message: "Success", data: update });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },

    /**
     * delete
     */

    delete: async (req, res, next) => {
        try {
            let deleteTerms = await Service.delete(req.params.id);
            if (deleteTerms) {
                return res.status(200).json({ error: false, message: "Success", data: deleteTerms });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },
};
