import { Router } from "express";
import { ServerInfo } from "@/controllers/server-info.js";

const router = Router();

router.get("/", ServerInfo);

export { router as ServerInfoRouter };
