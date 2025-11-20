import { Router } from "express";
import { signUp, login, logout, getLoggedInUser } from "@/controllers/auth.js";
import { multerUpload } from "@/config/multer.js";
import { isLoggedIn } from "@/middlewares/auth.js";

const router = Router();

router.post("/signup", multerUpload.single("avatar"), signUp);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/get-user", isLoggedIn, getLoggedInUser);

export { router as AuthRouter };
