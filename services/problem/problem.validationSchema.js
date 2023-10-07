const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const create = Joi.object({
    problemName: Joi.string().required(),
    haveYouComplainedBefore: Joi.boolean().default(false),
    city: Joi.string().required(),
    locality: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    pinCode: Joi.number(),
    complaintRaisedBy: Joi.objectId().required(),
    type: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()),
    complaint: Joi.string().required(),
    upVotes: Joi.number().default(0),
    downVotes: Joi.number().default(0),
    received: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    reviewed: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    assigned: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    inProgress: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    completed: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
});

const update = Joi.object({
    problemName: Joi.string().optional(),
    haveYouComplainedBefore: Joi.boolean().default(false),
    city: Joi.string().optional(),
    locality: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    pinCode: Joi.number(),
    complaintRaisedBy: Joi.objectId().optional(),
    type: Joi.string().optional(),
    coordinates: Joi.array().items(Joi.number()),
    complaint: Joi.string().optional(),
    upVotes: Joi.number().default(0),
    downVotes: Joi.number().default(0),
    received: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    reviewed: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    assigned: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    inProgress: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
    completed: Joi.object({
        status: Joi.boolean().default(false),
        date: Joi.date(),
    }),
});

const vote = Joi.object({
    vote: Joi.string().valid("upvote", "downvote").required(),
});

module.exports = {
    create,
    update,
    vote,
};
