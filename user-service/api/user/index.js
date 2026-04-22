const express = require("express");
const router = express.Router();

const controller = require("./controller");
const { checkEmail, auth } = require("../../middleware");
const { createUserValidator, updateUserValidator } = require("./validation");

router.post("/", createUserValidator, checkEmail, controller.createUser);
router.get("/", auth, controller.getUserProfile);
router.put("/", updateUserValidator, auth, controller.updateUser);
router.delete("/", auth, controller.deleteUser);

module.exports = router;
