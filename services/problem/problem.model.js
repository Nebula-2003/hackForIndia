const mongoose = require("mongoose");
let softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

const problemSchema = new Schema(
    {
        images: [{ type: String }],
        problemName: {
            type: String,
            required: true,
        },
        haveYouComplainedBefore: {
            type: Boolean,
            default: false,
        },
        city: {
            type: String,
            required: true,
        },
        locality: {
            type: String,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        pinCode: {
            type: Number,
        },
        complaintRaisedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        type: {
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
problemSchema.index({ location: "2dsphere" });

problemSchema.plugin(softDelete);

const problem = mongoose.model("problem", problemSchema);

module.exports = problem;
