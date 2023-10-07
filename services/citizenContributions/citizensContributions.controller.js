const Service = require("./citizensContributions.services");

module.exports = {
    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            console.log("🚀 ~ file: citizensContributions.controller.js:14 ~ create: ~ req.files.images:", req.files);
            if (req.files != undefined && req.files != undefined) {
                req.body.images = req.files.map((element) => {
                    return process.env.PUB_FILE + "/citizenContributions/" + element.filename;
                });
                console.log("🚀 ~ file: users.controller.js:14 ~ create: ~  req.body.image:", req.body.images);
            }
            let data = await Service.add(req.body);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: citizensContributions.controller.js:22 ~ create: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
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
            return res.status(400).json({ error: true, status: 400, message: error.message });
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
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: citizensContributions.controller.js:51 ~ list: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * Update
     */

    update: async (req, res, next) => {
        try {
            if (req.files != undefined && req.files != undefined) {
                req.body.images = req.files.map((element) => {
                    return process.env.PUB_FILE + "/citizenContributions/" + element.filename;
                });
                console.log("🚀 ~ file: users.controller.js:14 ~ create: ~  req.body.image:", req.body.images);
            }
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return res.status(200).json({ error: false, message: "Success", data: update });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.status(400).json({ error: true, status: 400, message: error.message });
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
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },
};
