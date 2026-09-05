const kafkaProducers = require("./producers/producer");
const publishOutbox = require("./outboxPublisher");

module.exports = { kafkaProducers, publishOutbox };
