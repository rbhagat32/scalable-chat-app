import { serverInfo } from "@/controllers/server-info.js";
import { Router } from "express";

const router = Router();

router.get("/", serverInfo);

export { router as ServerInfoRouter };
