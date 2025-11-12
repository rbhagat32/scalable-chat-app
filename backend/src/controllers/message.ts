import type { Request, Response } from "express";
import { TryCatch } from "@/utils/try-catch.js";
import { prisma } from "@/config/prisma.js";

const getAllMessages = TryCatch(async (_req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    select: {
      id: true,
      content: true,
      userId: true,
      user: true,
      createdAt: true,
    },
  });

  return res.status(200).json(messages);
});

export { getAllMessages };
