const kafka = require("../client");
const events = require("../../events");
const { kafka: kafkaConfig } = require("../../config/config");

const consumer = kafka.consumer({ groupId: kafkaConfig.groupId });

const topics = kafkaConfig.topics;

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topics: [topics.user, topics.address],
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

module.exports = runConsumer;
