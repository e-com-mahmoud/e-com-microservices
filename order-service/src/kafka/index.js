const runAddressConsumer = require("./consumers/address-consumer");
const runUserConsumer = require("./consumers/user-consumer");
const kafkaProducer = require("./producers");

async function runConsumers() {
  await runAddressConsumer().catch((err) => console.error(err));
  await runUserConsumer().catch((err) => console.error(err));
}

module.exports = { runConsumers, kafkaProducer };
