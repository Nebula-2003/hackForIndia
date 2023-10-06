const Service = require('./problem.services');


module.exports = {

    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            let data = await Service.add(req.body);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data })
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
                return commonResponse.success(res, "PROBLEM_GET", 200, data, 'Success');
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
            let query = {}
            let listAll = await Service.list(query);
            if (listAll) {
                return commonResponse.success(res, "PROBLEM_GET", 200, listAll, 'Success');
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
                return commonResponse.success(res, "PROBLEM_UPDATE", 200, update, 'Success');
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
                return commonResponse.success(res, "PROBLEM_DELETE", 200, deleteTerms, 'Success');
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }

}