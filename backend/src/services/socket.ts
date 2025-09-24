import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
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

    // Add Redis adapter for Socket.IO scaling
    this._io.adapter(createAdapter(pub, sub));
    console.log("Socket.IO Redis adapter configured for scaling !");

    // Subscribe to Redis for message distribution
    const messageSub = sub.duplicate();
    messageSub.subscribe("MESSAGES");

    // Handle Redis messages (separate from Socket.IO adapter)
    messageSub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log(
          `[${
            process.env.INSTANCE_ID || "backend"
          }] Message Received from Redis on channel "${channel}": ${message}`
        );

        this._io.emit("message", message);

        await ProduceMessage(message);
        console.log(
          `[${process.env.INSTANCE_ID || "backend"}] Message Produced to Kafka: ${message}`
        );
      }
    });
  }

  initListeners() {
    console.log(`[${process.env.INSTANCE_ID || "backend"}] Socket Listeners Initialized !`);

    const io = this._io;

    io.on("connect", (socket) => {
      console.log(`[${process.env.INSTANCE_ID || "backend"}] New Socket Connected: ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(
          `[${process.env.INSTANCE_ID || "backend"}] Message Received on Server: ${message}`
        );

        await pub.publish("MESSAGES", message);
        console.log(
          `[${process.env.INSTANCE_ID || "backend"}] Message Published to Redis: ${message}`
        );
      });
    });
  }

  get_io() {
    return this._io;
  }
}

export { SocketService };
