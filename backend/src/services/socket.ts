import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { pub, sub } from "@/config/redis.js";
import { ProduceMessage } from "@/services/kafka.js";
import { v4 as uuid } from "uuid";
import type { IMessage, IUser } from "@/types/types.js";
import { prisma } from "@/config/prisma.js";

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

      socket.on(
        "event:message",
        async ({ content, userId }: { content: string; userId: string }) => {
          const user: IUser | null = await prisma.user.findUnique({ where: { id: userId } });

          const message: IMessage = {
            id: uuid(),
            content,
            userId,
            user,
            createdAt: new Date(),
          };

          io.emit("emit:message", message);
          await ProduceMessage(message, "GLOBAL");
        }
      );
    });
  }

  get_io() {
    return this._io;
  }
}

export { SocketService };
