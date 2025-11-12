import { Kafka, type Producer, Partitioners } from "kafkajs";
import { prisma } from "@/config/prisma.js";
import type { IMessage } from "@/types/types.js";

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

const ProduceMessage = async (message: IMessage, roomId: string) => {
  const producer = await CreateKafkaProducer();

  await producer.send({
    topic: "MESSAGES",
    messages: [{ key: `message-${roomId}`, value: JSON.stringify(message) }],
  });

  return true;
};

const StartMessageConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "save-message" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;

      try {
        const parsedMessage: IMessage = JSON.parse(message.value?.toString());

        if (!parsedMessage.userId) {
          console.warn("Received message without userId:", parsedMessage);
          return;
        }

        await prisma.message.create({
          data: {
            id: parsedMessage.id,
            content: parsedMessage.content,
            user: {
              connect: { id: parsedMessage.userId },
            },
            createdAt: parsedMessage.createdAt,
          },
        });
      } catch (error) {
        console.error(`Error saving message to database:`, error);

        pause();
        setTimeout(() => {
          consumer.resume([{ topic: "MESSAGES" }]);
        }, 30 * 1000);
      }
    },
  });
};

export { ProduceMessage, StartMessageConsumer };
