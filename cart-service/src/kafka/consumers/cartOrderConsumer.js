const kafka = require("../client");
const events = require("../../events");

const consumer = kafka.consumer({ groupId: "cart-order-service-group" });

async function runOrderConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-topics", fromBeginning: true });

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

module.exports = runOrderConsumer;
