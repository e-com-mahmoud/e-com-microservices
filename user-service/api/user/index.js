const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { checkEmail, auth } = require("../../middleware");

router.post("/", checkEmail, controller.createUser);
router.get("/", auth, controller.getUser);
router.put("/", auth, controller.updateUser);
router.delete("/", auth, controller.deleteUser);

module.exports = router;
