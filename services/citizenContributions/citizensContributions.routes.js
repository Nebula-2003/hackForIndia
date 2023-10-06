const controller = require("./citizensContributions.controller");
const router = require("express").Router();
const guard = require("../../helper/auth");
const validate = require("../../helper/validationFunc");
const { create, update } = require("./citizen.validationSchema");

/*
 *  Add
 */
router.post("/create", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), validate(create), controller.create);

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
router.put("/update/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), validate(update), controller.update);

/*
 *  Delete
 */
router.delete("/delete/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.delete);

module.exports = router;
