import { Kafka, type Producer, Partitioners } from "kafkajs";
import { prisma } from "@/config/prisma.js";
import os from "os";

const kafka = new Kafka({
  brokers: [`${process.env.KAFKA_BROKER_URL}`],
});

let producer: Producer | null = null;

const CreateKafkaProducer = async () => {
  if (producer) return producer;

  const _producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  await _producer.connect();
  producer = _producer;
  return producer;
};

const ProduceMessage = async (message: string) => {
  const producer = await CreateKafkaProducer();

  await producer.send({
    topic: "MESSAGES",
    messages: [{ key: `message-${Date.now()}`, value: message }],
  });

  return true;
};

const StartMessageConsumer = async () => {
  console.log(`[${os.hostname()}] Starting Kafka Consumer !`);

  const consumer = kafka.consumer({ groupId: "save-message" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      console.log(
        `[${os.hostname()}] Kafka Consumer received new message: ${message.value?.toString()}`
      );

      if (!message.value) return;

      try {
        await prisma.message.create({
          data: {
            content: message.value.toString(),
          },
        });

        console.log(`[${os.hostname()}] Message saved to database: ${message.value.toString()}`);
      } catch (error) {
        console.error(`[${os.hostname()}] Error saving message to database:`, error);

        pause();

        setTimeout(() => {
          consumer.resume([{ topic: "MESSAGES" }]);
        }, 30 * 1000);
      }
    },
  });
};

export { ProduceMessage, StartMessageConsumer };
