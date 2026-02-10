const express = require("express");
const routes = express();

const { auth } = require("../middleware");
const addressRouter = require("./address");

routes.use("/address", auth, addressRouter);

module.exports = routes;
