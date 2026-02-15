const express = require("express");

const controller = require("./controller");
const { queryFilters, checkProduct } = require("../../middleware");

const router = express.Router();

router.post("/", controller.createProduct);
router.get("/", queryFilters, controller.listAllProducts);
router.get("/:id", checkProduct, controller.findProduct);
router.put("/:id", checkProduct, controller.updateProductDetails);
router.delete("/:id", checkProduct, controller.removeProduct);

module.exports = router;
