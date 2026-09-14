const express = require("express");
const router = express.Router();

const controller = require("./controller");
const { checkAddress } = require("../../middleware");
const {
  createAddressValidator,
  updateAddressValidator,
  idValidator,
} = require("./validation");

router.post("/", createAddressValidator, controller.createAddress);
router.get("/", controller.findUserAddresses);
router.get("/:id", idValidator, checkAddress, controller.getUserAddress);
router.put(
  "/:id",
  idValidator,
  updateAddressValidator,
  checkAddress,
  controller.updateAddress,
);
router.delete("/:id", idValidator, checkAddress, controller.deleteAddress);

module.exports = router;
