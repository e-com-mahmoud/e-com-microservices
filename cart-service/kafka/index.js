const runProductConsumer = require("./consumers/cartProductConsumer");
const runUserConsumer = require("./consumers/cartUserConsumer");

async function runConsumers() {
  await runProductConsumer().catch((err) => console.error(err));
  await runUserConsumer().catch((err) => console.error(err));
}

module.exports = runConsumers;
