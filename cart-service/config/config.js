require("dotenv").config();
const config = {
  app: {
    name: "CMS",
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
        PRODUCT_CREATED: "PRODUCT_CREATED",
        PRODUCT_UPDATED: "PRODUCT_UPDATED",
        PRODUCT_DELETED: "PRODUCT_DELETED",
        USER_CREATED: "USER_CREATED",
        USER_DELETED: "USER_DELETED",
      },
    },
  },
  jwt: {
    secret: process.env.SECRET,
    expiration: process.env.EXPIRATION,
    saltRounds: process.env.SALT_ROUNDS,
  },
};

module.exports = config;
