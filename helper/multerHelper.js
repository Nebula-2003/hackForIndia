const multer = require("multer");
const path = require("path");

/*
 * Image Upload and storage for User Profile
 */

const userUploadDirPath = path.join(__dirname, "..", "/public/userProfile");

let userImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, userUploadDirPath);
    },
    filename: function (req, file, cb) {
        let exploded_name = file.originalname.split(".");
        let ext = exploded_name[exploded_name.length - 1];
        cb(null, Date.now() + "." + ext);
    },
});

let userImageUpload = multer({
    storage: userImageStorage,
    limits: {
        fileSize: 15000000, // 5MB
    },
    fileFilter: function (req, file, cb) {
        return cb(null, true);
    },
}).fields([{ name: "image", maxCount: 1 }]);

/*
 * Image Upload and storage for Problem
 */

const problemUploadDirPath = path.join(__dirname, "..", "/public/problem");

const problemImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, problemUploadDirPath);
    },
    filename: function (req, file, cb) {
        let exploded_name = file.originalname.split(".");
        let ext = exploded_name[exploded_name.length - 1];
        cb(null, Date.now() + "." + ext);
    },
});

// Create a multer instance for handling image uploads
const problemImageUpload = multer({
    storage: problemImageStorage,
    limits: {
        fileSize: 150000000, // 150MB (for multiple files)
    },
    fileFilter: function (req, file, cb) {
        // You can add file filter logic here if needed
        // For now, we'll allow all files
        return cb(null, true);
    },
}).array("images", 5);

/*
 * Image Upload and storage for Problem
 */

const citizenContributionUploadDirPath = path.join(__dirname, "..", "/public/citizenContributions");

const citizenContributionImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, citizenContributionUploadDirPath);
    },
    filename: function (req, file, cb) {
        let exploded_name = file.originalname.split(".");
        let ext = exploded_name[exploded_name.length - 1];
        cb(null, Date.now() + "." + ext);
    },
});

// Create a multer instance for handling image uploads
const citizenContributionImageUpload = multer({
    storage: citizenContributionImageStorage,
    limits: {
        fileSize: 150000000, // 150MB (for multiple files)
    },
    fileFilter: function (req, file, cb) {
        // You can add file filter logic here if needed
        // For now, we'll allow all files
        return cb(null, true);
    },
}).array("images", 5);
module.exports = {
    userImageUpload,
    problemImageUpload,
    citizenContributionImageUpload,
};
