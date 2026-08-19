const events = require("../../../cart-service/src/events");

require("dotenv").config();
const config = {
  app: {
    name: "UMS",
    port: process.env.PORT || 9000,
    env: process.env.NODE_ENV,
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  kafka: {
    connection: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: process.env.KAFKA_BROKERS.split(","),
    },
    producer: {
      events: {
        userCreated: "user.created",
        userUpdated: "user.updated",
        userDeleted: "user.deleted",
      },
    },
    topics: {
      user: "user-topics",
    },
  },
  jwt: {
    secret: process.env.SECRET,
    expiration: process.env.EXPIRATION,
    saltRounds: process.env.SALT_ROUNDS,
  },
};

module.exports = config;
