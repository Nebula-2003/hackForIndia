const controller = require("./citizensContributions.controller");
const router = require("express").Router();
const guard = require("../../helper/auth");
const validate = require("../../helper/validationFunc");
const { create, update } = require("./citizen.validationSchema");
const multerSetting = require("../../helper/multerHelper").citizenContributionImageUpload;

/*
 *  Add
 */
router.post(
    "/create",
    multerSetting,
    (req, res, next) => {
        console.log("🚀 ~ file: citizensContributions.routes.js:54 ~ router.post ~ req.body", req.body);
        next();
    },
    guard.isAuthorized(["governmentOfficial", "citizen", "admin"]),
    validate(create),
    controller.create
);

/*
 *  Get By Id
 */
router.get("/get/:id", controller.get);

/*
 *  List All
 */
router.get("/list", controller.list);

/*
 *  Update
 */
router.put("/update/:id", multerSetting, guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), validate(update), controller.update);

/*
 *  Delete
 */
router.delete("/delete/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.delete);

module.exports = router;
