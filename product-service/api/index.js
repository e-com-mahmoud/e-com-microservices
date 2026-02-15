const express = require("express");
const routes = express();

const productRouter = require("./product");

routes.use("/product", productRouter);

module.exports = routes;