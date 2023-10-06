const Service = require("./users.services");

module.exports = {
    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            let data = await Service.add(req.body);
            if (data) {
                return commonResponse.success(res, "USER_CREATE", 200, data, "Success");
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    /**
     * Login
     */
    login: async (req, res, next) => {
        try {
            let user = await Service.findOne({ email: req.body.email });
            if (!user) {
                return res.json({ error: true, status: 400, message: "User not found" });
            }
            let isMatch = await user.comparePassword(req.body.password, user.password);
            if (!isMatch) {
                return res.json({ error: true, status: 401, message: "Password not match" });
            }
            let token = await Service.createToken(user);
            if (token) {
                return commonResponse.success(res, "USER_LOGIN", 200, { token: token }, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:28 ~ login: ~ error:", error);
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
                return commonResponse.success(res, "USER_GET", 200, data, "Success");
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
                return commonResponse.success(res, "USER_GET", 200, listAll, "Success");
            } else {
                return res.json({ error: false, status: 200, data: [], message: "No data found" });
            }
        } catch (error) {
            return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },

    /**
     * Update
     */

    update: async (req, res, next) => {
        try {
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return res.json({error: false, status: 200, message: "Success",data:update})
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
                return commonResponse.success(res, "USER_DELETE", 200, deleteTerms, "Success");
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
        }
    },
};
