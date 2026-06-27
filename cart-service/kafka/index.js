const runProductConsumer = require("./consumers/cartProductConsumer");
const runUserConsumer = require("./consumers/cartUserConsumer");
const runOrderConsumer = require("./consumers/cartOrderConsumer");

async function runConsumers() {
  await runProductConsumer().catch((err) => console.error(err));
  await runUserConsumer().catch((err) => console.error(err));
  await runOrderConsumer().catch((err) => console.error(err));
}

module.exports = runConsumers;
