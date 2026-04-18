const express = require("express");
const cors = require("cors");

const db = require("./models");
const routes = require("./api");
const config = require("./config/config");
const { errors } = require("celebrate");

const app = express();
const { port } = config.app;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

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
