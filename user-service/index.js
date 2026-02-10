require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./models");
const routes = require("./api");
const { initKafka } = require("./kafka/admin");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

const start = async () => {
  try {
    await initKafka();
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
