const Service = require("./citizensContributions.services");

module.exports = {
    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            let data = await Service.add(req.body);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
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
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
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
                return res.status(200).json({ error: false, message: "Success", data: list });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    /**
     * Update
     */

    update: async (req, res, next) => {
        try {
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return res.status(200).json({ error: false, message: "Success", data: update });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
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
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
};
