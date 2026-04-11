const express = require("express");
const controller = require("./controller");
const { checkAddress } = require("../../middleware");
const router = express.Router();

router.post("/", controller.createAddress);
router.get("/", controller.findAllUserAddresses);
router.get("/:id", checkAddress, controller.getUserAddress);
router.put("/:id", checkAddress, controller.updateAddress);
router.delete("/:id", checkAddress, controller.deleteAddress);

module.exports = router;
