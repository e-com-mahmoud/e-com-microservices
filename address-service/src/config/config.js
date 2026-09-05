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
      events: {
        userCreated: "user.created",
        userUpdated: "user.updated",
        userDeleted: "user.deleted",
      },
    },
    producers: {
      events: {
        addressCreated: "address.created",
        addressUpdated: "address.updated",
        addressDeleted: "address.deleted",
      },
    },
    topics: {
      address: "address-topics",
      user: "user-topics",
    },
    groupId: "address-group",
  },
  jwt: {
    secret: process.env.SECRET,
  },
};
