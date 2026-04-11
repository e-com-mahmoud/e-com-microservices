const kafka = require('./client');

const admin = kafka.admin();

async function initKafka() {
  await admin.connect();

  const topics = await admin.listTopics();

  if (!topics.includes('product-events')) {
    await admin.createTopics({
      topics: [
        {
          topic: 'product-events',
        },
      ],
    });

    console.log('Kafka topic "product-events" created');
  }

  await admin.disconnect();
}

module.exports = { initKafka };