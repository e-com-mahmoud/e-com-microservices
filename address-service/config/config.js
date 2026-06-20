require("dotenv").config();
module.exports = {
  app: {
    name: "AMS",
    port: process.env.PORT,
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
    consumers: {
      topics: {
        USER_CREATED: "USER_CREATED",
        USER_UPDATED: "USER_UPDATED",
        USER_DELETED: "USER_DELETED",
      },
    },
    producers: {
      ADDRESS_CREATED: "ADDRESS_CREATED",
      ADDRESS_UPDATED: "ADDRESS_UPDATED",
      ADDRESS_DELETED: "ADDRESS_DELETED",
    },
  },
  jwt: {
    secret: process.env.SECRET,
    expiration: process.env.EXPIRATION,
    saltRounds: process.env.SALT_ROUNDS,
  },
};
