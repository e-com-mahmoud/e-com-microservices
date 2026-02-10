const kafka = require('./client');

const admin = kafka.admin();

async function initKafka() {
  await admin.connect();

  const topics = await admin.listTopics();

  if (!topics.includes('user-events')) {
    await admin.createTopics({
      topics: [
        {
          topic: 'user-events',
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });

    console.log('Kafka topic "user-events" created');
  }

  await admin.disconnect();
}

module.exports = { initKafka };