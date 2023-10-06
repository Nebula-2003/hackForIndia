const controller = require("./citizensContributions.controller");
const router = require("express").Router();
const guard = require("../../helper/auth");

/*
 *  Add
 */
router.post("/create", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.create);

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
router.put("/update/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.update);

/*
 *  Delete
 */
router.delete("/delete/:id", guard.isAuthorized(["governmentOfficial", "citizen", "admin"]), controller.delete);

module.exports = router;
