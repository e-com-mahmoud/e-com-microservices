const kafka = require("../client");
const { User } = require("../../models");
const topics = require("../topics");

const consumer = kafka.consumer({ groupId: "cart-user-service-group" });

async function runUserConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: true });

  console.log("📦 cart Service Kafka consumer running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        if (event.type === topics.USER_CREATED) {
          await User.findOrCreate({
            where: { id: event.payload.id },
            defaults: {
              email: event.payload.email,
              createdAt: event.payload.createdAt,
            },
          });
        } else if (event.type === topics.USER_DELETED) {
          await User.destroy({ where: { id: event.payload.id } });
        }
      } catch (err) {
        console.error("❌ Error processing Kafka message", err);
      }
    },
  });
}

module.exports = runUserConsumer;
