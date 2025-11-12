import { Router } from "express";
import { serverInfo } from "@/controllers/server-info.js";

const router = Router();

router.get("/", serverInfo);

export { router as ServerInfoRouter };
