const controller = require("./problem.controller");
const router = require("express").Router();
const guard = require("../../helper/auth");
const validate = require("../../helper/validationFunc");
const { create, update, vote } = require("./problem.validationSchema");
const multerSetting = require("../../helper/multerHelper").problemImageUpload;

/*
 *  Add
 */
router.post(
    "/create",
    guard.isAuthorized(["governmentOfficial", "citizen", "admin"]),
    multerSetting,
    (req, res, next) => {
        console.log(req.files);
        next();
    },
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
router.put("/update/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), multerSetting, validate(update), controller.update);

/*
 *  Delete
 */
router.delete("/delete/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.delete);

/**
 * Vote
 */
router.put("/vote/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), validate(vote), controller.vote);

module.exports = router;
