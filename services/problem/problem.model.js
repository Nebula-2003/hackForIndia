const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;


const problemSchema = new Schema (
    {
        complaintRaisedBy:{
            type: String,
        },
        complaint:{
            type:String,
            required: true
        },
        upVotes:{
            type: Number,
            default : 0
        },
        downVotes:{
            type: Number,
            default : 0
        },
},
    { timestamps: true }
);

problemSchema.plugin(softDelete);

const problem = mongoose.model("problem", problemSchema);

module.exports = problem;