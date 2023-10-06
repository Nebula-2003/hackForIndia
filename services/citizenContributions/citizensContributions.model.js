const mongoose = require("mongoose");
let softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

const citizenContributionsSchema = new Schema(
    {
        citizenId:{
            type: Schema.Types.ObjectId,
            ref: "citizens",
            required: true,
        },
        problemId:{
            type: Schema.Types.ObjectId,
            ref: "problems",
            required: true,
        },
        images: [{ type: String }],
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

    },
    { timestamps: true, collection: "citizenContributions" }
);

citizenContributionsSchema.plugin(softDelete);

const citizenContributions = mongoose.model("citizenContributions", citizenContributionsSchema);

module.exports = citizenContributions;
