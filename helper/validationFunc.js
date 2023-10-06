const Joi = require("joi");

function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ sucess: false, message: "Validation Error", error: error.details[0].message });
        }
        next();
    };
}

module.exports = validateBody;
