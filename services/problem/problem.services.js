const Model = require("./problem.model");

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
    return await Model.aggregate([
        { $match: query },
        {
            $addFields: {
                netVotes: { $subtract: ["$upVotes", "$downVotes"] },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "complaintRaisedBy",
                foreignField: "_id",
                as: "complaintRaisedByData",
            },
        },
        {
            $sort: { netVotes: -1 },
        },
    ]);
};

/**
 *update
 */

exports.update = async (query, reqBody) => {
    return await Model.findByIdAndUpdate(query, { $set: reqBody }, { new: true }).lean();
};

/**
 *Delete
 */

exports.delete = async (query) => {
    return await Model.findByIdAndDelete(query).lean();
};

/**
 * vote
 */

exports.vote = async (id, vote) => {
    if (vote.toLowerCase() == "upvote") {
        console.log("id", id);
        return await Model.findByIdAndUpdate({ _id: id }, { $inc: { upVotes: 1 } }, { new: true }).lean();
    } else if (vote.toLowerCase() == "downvote") {
        return await Model.findByIdAndUpdate({ _id: id }, { $inc: { downVotes: 1 } }, { new: true }).lean();
    }
};
