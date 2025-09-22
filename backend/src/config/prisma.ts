import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma
  .$connect()
  .then(() => {
    console.log("Connected to PostgreSQL !");
  })
  .catch((e) => {
    console.error("Error connecting to PostgreSQL: ", e);
  });

prisma.$on("error", (e) => {
  console.error("Prisma error: ", e);
});

export { prisma };
