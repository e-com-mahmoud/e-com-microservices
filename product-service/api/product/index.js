const express = require("express");

const controller = require("./controller");
const { queryFilters, checkProduct } = require("../../middleware");

const router = express.Router();

router.post("/", controller.createProduct);
router.get("/", queryFilters, controller.getAllProducts);
router.get("/:id", checkProduct, controller.getOneProduct);
router.put("/:id", checkProduct, controller.updateProduct);
router.delete("/:id", checkProduct, controller.deleteProduct);

module.exports = router;
