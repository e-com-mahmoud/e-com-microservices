const express = require("express");
const routes = express();

const orderRouter = require("./order");

routes.use("/order", orderRouter);

module.exports = routes;
