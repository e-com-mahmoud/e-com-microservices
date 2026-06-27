const express = require("express");
const router = express.Router();

const controller = require("./controller");
const validator = require("./validation");
const { auth, checkAddress, checkOrder } = require("../../middleware");

router.post(
  "/",
  validator.createOrderValidation,
  auth,
  checkAddress,
  controller.createOrder,
);
router.get(
  "/:id",
  validator.getOrderValidation,
  auth,
  checkOrder,
  controller.getOrder,
);
router.patch(
  "/:id",
  validator.updateOrderValidation,
  auth,
  checkOrder,
  controller.updateOrder,
);

module.exports = router;
