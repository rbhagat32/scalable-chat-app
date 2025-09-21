import { Router } from "express";
import { GetAllMessages } from "@/controllers/message.js";

const router = Router();

router.get("/", GetAllMessages);

export { router as MessageRouter };
