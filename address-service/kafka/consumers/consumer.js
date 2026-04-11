const kafka = require("../client");
const events = require("../../events");
const consumer = kafka.consumer({ groupId: "address-service-group" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: true });

  console.log("Address Service Kafka consumer running");

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
runConsumer().catch((err) => console.error(err));

module.exports = runConsumer;
