const express = require("express");
const router = express.Router();

const controller = require("./controller");
const {
  checkAvailableCart,
  checkCart,
  checkItem,
  checkProduct,
} = require("../../middleware");
const {
  createItemValidator,
  updateItemValidator,
  idValidator,
} = require("./validation");

router.post("/", checkAvailableCart, controller.createUserCart);
router.get("/", checkCart, controller.getCart);
router.post(
  "/item",
  createItemValidator,
  checkProduct,
  checkCart,
  controller.createItems,
);
router.put(
  "/item/:id",
  idValidator,
  updateItemValidator,
  checkCart,
  checkItem,
  controller.updateItem,
);
router.delete(
  "/item/:id",
  idValidator,
  checkCart,
  checkItem,
  controller.deleteItem,
);

module.exports = router;
