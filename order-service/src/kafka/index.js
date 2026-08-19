const runConsumer = require("./consumers/consumer");
const kafkaProducer = require("./producers");

module.exports = { runConsumer, kafkaProducer };
