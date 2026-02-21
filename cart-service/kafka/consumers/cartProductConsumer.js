const kafka = require("../client");
const { Product } = require("../../models");
const topics = require("../topics");

const consumer = kafka.consumer({ groupId: "cart-service-group" });

async function runProductConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "product-events", fromBeginning: true });

  console.log("📦 Cart Service Kafka consumer running...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        if (event.type === topics.PRODUCT_CREATED) {
          await Product.bulkCreate(
            event.payload.map((p) => ({
              id: p.id,
              title: p.title,
              price: p.price,
              createdAt: p.createdAt,
            })),
            {
              ignoreDuplicates: true,
            },
          );
        } else if (event.type === topics.PRODUCT_UPDATED) {
          await Product.update(
            {
              title: event.payload.title,
              price: event.payload.price,
              updatedAt: new Date(),
            },
            { where: { id: event.payload.id } },
          );
        } else if (event.type === topics.PRODUCT_DELETED) {
          await Product.destroy({ where: { id: event.payload.id } });
        }
      } catch (err) {
        console.error("❌ Error processing Kafka message", err);
      }
    },
  });
}

module.exports = runProductConsumer;
