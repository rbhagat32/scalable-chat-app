import { Router } from "express";
import { getAllMessages } from "@/controllers/message.js";
import { isLoggedIn } from "@/middlewares/auth.js";

const router = Router();

router.get("/", isLoggedIn, getAllMessages);

export { router as MessageRouter };
