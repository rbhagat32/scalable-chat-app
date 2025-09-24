import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { pub, sub } from "@/config/redis.js";
import { ProduceMessage } from "@/services/kafka.js";
import os from "os";

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

    // Redis adapter -> handles Pub/Sub automatically
    this._io.adapter(createAdapter(pub, sub));
    console.log("Socket.IO Redis Adapter Configured !");
  }

  initListeners() {
    console.log(`[${os.hostname()}] Socket Listeners Initialized !`);

    const io = this._io;

    io.on("connect", (socket) => {
      console.log(`[${os.hostname()}] New Socket Connected: ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`[${os.hostname()}] Message Received on Server: ${message}`);

        io.emit("message", message);

        await ProduceMessage(message);
        console.log(`[${os.hostname()}] Message Produced to Kafka: ${message}`);
      });
    });
  }

  get_io() {
    return this._io;
  }
}

export { SocketService };
