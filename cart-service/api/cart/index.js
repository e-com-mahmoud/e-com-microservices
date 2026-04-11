const express = require("express");
const controller = require("./controller");
const {
  checkAvailableCart,
  checkCart,
  checkItem,
} = require("../../middleware");

const router = express.Router();

router.post("/", checkAvailableCart, controller.createUserCart);
router.get("/", checkCart, controller.getCart);
router.post("/item", checkCart, controller.createItems);
router.put("/item/:id", checkCart, checkItem, controller.updateItem);
router.delete("/item/:id", checkCart, checkItem, controller.deleteItem);

module.exports = router;
