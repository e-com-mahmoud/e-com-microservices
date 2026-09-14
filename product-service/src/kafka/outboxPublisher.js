const { outboxServices } = require("../services");
const produceEvent = require("./producers/producer");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function publishOutbox() {
  while (true) {
    try {
      const events = await outboxServices.findUnpublishedEvents();
      for (const event of events) {
        try {
          await produceEvent(event.eventType, event.payload);
          await outboxServices.updateOutbox(
            { publishedAt: new Date() },
            event.id,
          );
        } catch (e) {
          console.log(`Failed to publish outbox event ${event.id}:`, e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    await sleep(5000);
  }
}

module.exports = publishOutbox;
