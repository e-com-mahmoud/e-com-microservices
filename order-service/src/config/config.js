require("dotenv").config();
const config = {
  app: {
    name: "OMS",
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
    producers: {
      events: {
        orderCreated: "order.created",
      },
    },
    topics: {
      address: "address-topics",
      user: "user-topics",
      order: "order-topics",
    },
    groupId: "order-group",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  cartClient: {
    URL: process.env.CART_SERVICE_URL,
  },
};

module.exports = config;
