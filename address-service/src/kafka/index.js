const produceEvent = require("./producers");
const publishOutbox = require("./outboxPublisher");

module.exports = { produceEvent, publishOutbox };
