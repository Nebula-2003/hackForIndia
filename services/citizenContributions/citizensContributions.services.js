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
 * GeoNear Listing
 */
exports.geoNearList = async (query) => {
    return await Model.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(query.longitude), parseFloat(query.latitude)],
                },
                distanceField: "distance",
                maxDistance: 100000,
                spherical: true,
            },
        },
        {
            $sort: {
                distance: 1, // Sort by distance in ascending order (nearest to farthest)
            },
        },
    ]);
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
