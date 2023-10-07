const Service = require("./problem.services");
const UserService = require("../users/users.services");
const { query } = require("express");

module.exports = {
    /**
     * Add
     */
    create: async (req, res, next) => {
        try {
            delete req.body.upVotes;
            delete req.body.downVotes;
            req.body.location = { type: "Point" };
            req.body.location.coordinates = req.body.coordinates;

            console.log("🚀 ~ file: problem.controller.js:17 ~ create: ~ req.files:", req.files);
            if (req.files != undefined && req.files != undefined) {
                req.body.images = req.files.map((element) => {
                    const fs = require("fs");
                    // Read the file as binary data
                    const fileData = fs.readFileSync(element.path);
                    const base64Data = fileData.toString("base64");
                    const updatedImageData = "data:image/jpeg;base64," + base64Data;
                    return updatedImageData;
                });
            }
            let data = await Service.add(req.body);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:28 ~ create: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * Get
     */

    get: async (req, res, next) => {
        try {
            let data = await Service.get(req.params.id);
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * List
     */

    list: async (req, res, next) => {
        try {
            let query = {};
            let listAll = {};
            if (req.query.longitude && req.query.latitude) {
                listAll = await Service.geoNearList(req.query);
            } else {
                listAll = await Service.list(query);
            }
            if (listAll) {
                return res.status(200).json({ error: false, message: "Success", data: listAll });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:52 ~ list: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * Update
     */

    update: async (req, res, next) => {
        try {
            let query = { _id: req.params.id };
            if (req.user.role == "citizen") {
                query.complaintRaisedBy = req.user.id;
            }
            delete req.body.upVotes;
            delete req.body.downVotes;
            if (req.files != undefined && req.files != undefined) {
                req.body.images = req.files.map((element) => {
                    const fs = require("fs");
                    const fileData = fs.readFileSync(element.path);
                    const base64Data = fileData.toString("base64");
                    const updatedImageData = "data:image/jpeg;base64," + base64Data;
                    return updatedImageData;
                });
                console.log("🚀 ~ file: users.controller.js:14 ~ create: ~  req.body.image:", req.body.images);
            }
            let update = await Service.update(query, req.body);
            if (update) {
                return res.status(200).json({ error: false, message: "Success", data: update });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:75 ~ update: ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * delete
     */

    delete: async (req, res, next) => {
        try {
            query = { _id: req.params.id };
            if (req.user.role == "citizen") {
                query.complaintRaisedBy = req.user.id;
            }
            let deleteTerms = await Service.delete(query);
            if (deleteTerms) {
                return res.status(200).json({ error: false, message: "Success", data: deleteTerms });
            } else {
                return res.json({ error: true, status: 400, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },

    /**
     * Upload
     */
    vote: async (req, res, next) => {
        try {
            let hasVoted = await UserService.getIfVoted(req.user.id, req.params.id);
            if (hasVoted) {
                return res.status(400).json({ error: true, status: 400, message: "You have already voted for this problem" });
            }
            let data = await Service.vote(req.params.id, req.body.vote);
            let updatedUser = await UserService.rawUpdate({ _id: req.user.id }, { $push: { votedComplaintsList: req.params.id } }, { new: true });
            if (data) {
                return res.status(200).json({ error: false, message: "Success", data: data });
            } else {
                return res.json({ error: true, message: "Something went wrong, Please try again" });
            }
        } catch (error) {
            console.log("🚀 ~ file: problem.controller.js:96 ~ upvote:async ~ error:", error);
            return res.status(400).json({ error: true, status: 400, message: error.message });
        }
    },
};
