import type { Request, Response } from "express";
import os from "os";

const ServerInfo = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    instanceId: os.hostname(),
    port: process.env.PORT || 4000,
    timestamp: new Date().toLocaleString(),
  });
};

export { ServerInfo };
