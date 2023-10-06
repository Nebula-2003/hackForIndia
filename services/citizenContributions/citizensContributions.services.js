const Model = require("./citizensContributions.model");

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
 *List
 */

exports.list = async (query) => {
    return await Model.find(query).lean();
};


/**
 *update
 */

exports.update = async (id, reqBody) => {
    return await Model.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
};

/**
 *Delete
 */

exports.delete = async (id) => {
    return await Model.findByIdAndDelete({ _id: id }).lean();
};
