const express = require("express");
const routes = express();

const userRouter = require("./user");

routes.use("/user", userRouter);

module.exports = routes;
