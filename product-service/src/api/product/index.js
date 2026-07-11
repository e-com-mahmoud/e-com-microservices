const express = require("express");
const router = express.Router();

const controller = require("./controller");
const { queryFilters, checkProduct } = require("../../middleware");
const {
  createProductValidator,
  updateProductValidator,
  idValidator,
} = require("./validation");

router.post("/", createProductValidator, controller.createProduct);
router.get("/", queryFilters, controller.getAllProducts);
router.get("/:id", idValidator, checkProduct, controller.getOneProduct);
router.put(
  "/:id",
  updateProductValidator,
  checkProduct,
  controller.updateProduct,
);
router.delete("/:id", idValidator, checkProduct, controller.deleteProduct);

module.exports = router;
