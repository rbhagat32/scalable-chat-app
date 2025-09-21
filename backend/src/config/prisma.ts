import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma.$connect().then(() => {
  console.log("Connected to PostgreSQL !");
});

export { prisma };
