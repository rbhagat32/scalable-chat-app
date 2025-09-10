import { Server } from "socket.io";
import { pub, sub } from "@/config/redis.js";
import { ProduceMessage } from "@/services/kafka.js";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Socket Service Initialized !");

    this._io = new Server({
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["*"],
        credentials: true,
      },
    });

    sub.subscribe("MESSAGES");
  }

  initListeners() {
    console.log("Socket Listeners Initialized !");

    const io = this._io;

    io.on("connect", (socket) => {
      console.log(`New Socket Connected: ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`Message Received on Server: ${message}`);

        await pub.publish("MESSAGES", message);
        console.log(`Message Published to Redis: ${message}`);
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log(`Message Received from Redis on channel "${channel}": ${message}`);

        io.emit("message", message);

        await ProduceMessage(message);
        console.log(`Message Produced to Kafka: ${message}`);
      }
    });
  }

  get_io() {
    return this._io;
  }
}

export { SocketService };
