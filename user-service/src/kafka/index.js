const produceEvent = require("./producers/producer");
const publishOutbox = require("./outboxPublisher");

module.exports = { produceEvent, publishOutbox };
