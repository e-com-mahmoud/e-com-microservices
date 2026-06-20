const runAddressConsumer = require("./consumers/address-consumer");
const runUserConsumer = require("./consumers/user-consumer");

async function runConsumers() {
  await runAddressConsumer().catch((err) => console.error(err));
  await runUserConsumer().catch((err) => console.error(err));
}

module.exports = runConsumers;
