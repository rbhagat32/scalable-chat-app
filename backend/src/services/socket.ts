import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { pub, sub } from "@/config/redis.js";
import { ProduceMessage } from "@/services/kafka.js";
import { v4 as uuid } from "uuid";

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["*"],
        credentials: true,
      },
    });

    this._io.adapter(createAdapter(pub, sub));
  }

  initListeners() {
    const io = this._io;

    io.on("connect", (socket) => {
      console.log(`New Socket Connected: ${socket.id}`);

      socket.on("event:message", async ({ content }: { content: string }) => {
        const message: IMessage = {
          id: uuid(),
          content,
          createdAt: new Date(),
        };

        io.emit("message", message);
        await ProduceMessage(message, "ROOM_GLOBAL");
      });
    });
  }

  get_io() {
    return this._io;
  }
}

export { SocketService };
