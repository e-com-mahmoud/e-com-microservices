const kafka = require("../client");
const events = require("../../events");
const { kafka: kafkaConfig } = require("../../config/config");

const consumer = kafka.consumer({ groupId: kafkaConfig.groupId });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: kafkaConfig.topics.user,
    fromBeginning: true,
  });

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
