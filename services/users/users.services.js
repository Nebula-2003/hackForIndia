const Model = require("./users.model");

/**
 * add
 */

exports.add = async (reqBody) => {
    return await Model(reqBody).save();
};

/**
 *Get
 */

exports.get = async (id) => {
    return await Model.findOne({ _id: id }).sort({ created_at: -1 }).lean();
};

/**
 *Get
 */

exports.findOneByQuery = async (query) => {
    return await Model.findOne(query).sort({ created_at: -1 }).lean();
};

/**
 *List
 */

exports.list = async (query) => {
    return await Model.find(query).select({ password: 0, email: 0, number: 0 }).lean();
};

/**
 *update
 */

exports.update = async (id, reqBody) => {
    return await Model.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
};
/**
 * Raw update
 */

exports.rawUpdate = async (query, updateData,options) => {
    return await Model.findOneAndUpdate(query, updateData,options).lean();
}

/**
 *Delete
 */

exports.delete = async (id) => {
    return await Model.findByIdAndDelete({ _id: id }).lean();
};


/**
 * vote checking api
 */
exports.getIfVoted = async (id, problemId) => {
    return await Model.findOne({ _id: id, votedComplaintsList: problemId }).lean();
}