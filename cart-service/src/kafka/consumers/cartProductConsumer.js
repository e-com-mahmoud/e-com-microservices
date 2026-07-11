const kafka = require("../client");
const events = require("../../events");

const consumer = kafka.consumer({ groupId: "cart-product-service-group" });

async function runProductConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "product-topics", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        const handler = events[event.type];
        await handler(event);
      } catch (err) {
        console.error("Error processing Kafka message", err);
      }
    },
  });
}

module.exports = runProductConsumer;
