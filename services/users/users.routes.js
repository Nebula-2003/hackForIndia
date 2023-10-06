const controller = require("./users.controller");
const router = require("express").Router();
const guard = require("../../helper/auth");
const validate = require("../../helper/validationFunc");
const { create, update, login } = require("./users.validationSchema");

/*
 *  Add
 */
router.post("/create", validate(create), controller.create);

/*
 *  Login
 */
router.post("/login", validate(login), controller.login);

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
router.put("/update/:id", guard.isAuthorized(["citizen", "admin"]), validate(update), controller.update);

/*
 *  Delete
 */
router.delete("/delete/:id", guard.isAuthorized(["citizen", "admin"]), controller.delete);

module.exports = router;
