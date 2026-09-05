const express = require("express");
const routes = express();

const cartRouter = require("./cart");
const { auth } = require("../middleware");

routes.use("/cart", auth, cartRouter);

module.exports = routes;
