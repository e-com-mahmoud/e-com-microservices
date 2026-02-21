const kafka = require("./client");
const { User } = require("../models");
const topics = require("./topics");

const consumer = kafka.consumer({ groupId: "address-service-group" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: true });

  console.log("📦 Address Service Kafka consumer running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        if (event.type === topics.USER_CREATED) {
          await User.findOrCreate({
            where: { id: event.payload.id },
            defaults: {
              email: event.payload.email,
              name: event.payload.name,
              phoneNumber: event.payload.phoneNumber,
              createdAt: event.payload.createdAt,
            },
          });
        } else if (event.type === topics.USER_UPDATED) {
          await User.update(
            {
              email: event.payload.email,
              name: event.payload.name,
              phoneNumber: event.payload.phoneNumber,
              updatedAt: new Date(),
            },
            { where: { id: event.payload.id } },
          );
        } else if (event.type === topics.USER_DELETED) {
          await User.destroy({ where: { id: event.payload.id } });
        }
      } catch (err) {
        console.error("❌ Error processing Kafka message", err);
      }
    },
  });
}
runConsumer().catch((err) => console.error(err));

module.exports = runConsumer;
