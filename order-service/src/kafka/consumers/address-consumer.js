const kafka = require("../client");
const events = require("../../events");

const consumer = kafka.consumer({ groupId: "order-address-service-group" });

async function runAddressConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "address-topics", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        const handler = events[event.type];
        await handler(event);
      } catch (e) {
        console.error("Error processing Kafka message", e);
      }
    },
  });
}

module.exports = runAddressConsumer;
