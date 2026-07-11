const kafka = require("../client");
const events = require("../../events");

const consumer = kafka.consumer({ groupId: "order-user-service-group" });

async function runUserConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-topics", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        const handler = events[event.type];
        await handler(event);
      } catch (e) {
        console.error("Error processing Kafka message", e);
        throw e;
      }
    },
  });
}

module.exports = runUserConsumer;
