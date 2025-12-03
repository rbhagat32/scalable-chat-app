import { getAllMessages } from "@/controllers/message.js";
import { isLoggedIn } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", isLoggedIn, getAllMessages);

export { router as MessageRouter };
