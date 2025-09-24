import type { Request, Response } from "express";

const ServerInfo = (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    instanceId: process.env.INSTANCE_ID || "backend-unknown",
    port: process.env.PORT || 4000,
    timestamp: new Date().toLocaleString(),
  });
};

export { ServerInfo };
