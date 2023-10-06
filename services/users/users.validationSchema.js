const Joi = require("joi");

const create = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    number: Joi.string().optional(),
    password: Joi.string().required(),
    image: Joi.string().optional(),
});

const update = Joi.object({
    email: Joi.string().email().optional(),
    fullName: Joi.string().optional(),
    number: Joi.string().allow("").optional(),
    password: Joi.string().optional(),
    image: Joi.string().optional(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    create,
    update,
    login,
};
