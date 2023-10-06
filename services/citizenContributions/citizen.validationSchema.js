const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const create = Joi.object({
    citizenId: Joi.string().required(),
    problemId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});

const update = Joi.object({
    images: Joi.string().optional(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
});

module.exports = {
    create,
    update,
};
