const mongoose = require("mongoose");
let softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

const problemSchema = new Schema(
    {
        complaintRaisedBy: {
            type: String,
        },
        type:{
            type: String,
            required: true,
        },
        location: {
            type: { type: String, default: "Point" },
            coordinates: [Number], // [longitude, latitude]
        },
        complaint: {
            type: String,
            required: true,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        downVotes: {
            type: Number,
            default: 0,
        },
        received: {
            type: Object,
            status: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
            },
        },
        reviewed: {
            type: Object,
            status: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
            },
        },
        assigned: {
            type: Object,
            status: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
            },
        },
        inProgress: {
            type: Object,
            status: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
            },
        },
        completed: {
            type: Object,
            status: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);

problemSchema.plugin(softDelete);

const problem = mongoose.model("problem", problemSchema);

module.exports = problem;
