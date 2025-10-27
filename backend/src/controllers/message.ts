import type { Request, Response } from "express";
import { TryCatch } from "@/utils/try-catch.js";
import { prisma } from "@/config/prisma.js";

const GetAllMessages = TryCatch(async (_req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
  });

  return res.status(200).json(messages);
});

export { GetAllMessages };
