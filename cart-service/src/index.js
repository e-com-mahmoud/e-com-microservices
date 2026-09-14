const express = require("express");
const cors = require("cors");

const db = require("./models");
const routes = require("./api");
const app = express();

const kafkaConsumer = require("./kafka");
const config = require("./config/config");
const { errors } = require("celebrate");
const { errorHandler } = require("./middleware");

const { port } = config.app;

kafkaConsumer();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("DB connected");
    app.listen(port, () => {
      console.log("sever is up on port " + port);
    });
  } catch (e) {
    console.error("Startup failed:", e);
  }
};
start();
