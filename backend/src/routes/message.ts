import { prisma } from "@/config/prisma.js";
import type { IncomingMessage, ServerResponse } from "http";

async function GetAllMessages(_req: IncomingMessage, res: ServerResponse) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(messages));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch messages" }));
  }
}

export { GetAllMessages };
