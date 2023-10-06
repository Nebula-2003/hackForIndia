const mongoose = require("mongoose");
let softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        fullName: {
            type: String,
        },
        number: {
            type: String,
            required: false,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            default: "",
        },
        role: {
            type: String,
            enum: ["governmentOfficial", "citizen", "admin"],
            default: "citizen",
            required: false,
        },
    },
    { timestamps: true }
);

usersSchema.plugin(softDelete);

const users = mongoose.model("users", usersSchema);

module.exports = users;
