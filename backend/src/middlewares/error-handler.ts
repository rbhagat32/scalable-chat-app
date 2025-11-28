import { Prisma } from "@/generated/prisma/client.js";
import type { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorHandlerMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,

  _next: NextFunction
) => {
  err.statusCode ||= 500;
  err.message ||= "Internal Server Error";

  console.log(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const target = err.meta?.target;

        const fields = Array.isArray(target)
          ? target.join(", ")
          : typeof target === "string"
            ? target
            : "unknown field";

        return res.status(400).json({
          status: 400,
          error: "Unique constraint failed",
          message: `Duplicate value for field: ${fields}`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({
      status: 500,
      error: "Unknown Prisma error",
      message: "A database error occurred",
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(err.statusCode).json({
    status: err.statusCode,
    error: err.name,
    message: err.message,
    timestamp: new Date().toISOString(),
  });
};
