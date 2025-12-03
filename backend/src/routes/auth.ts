import { multerUpload } from "@/config/multer.js";
import { getLoggedInUser, login, logout, signUp } from "@/controllers/auth.js";
import { isLoggedIn } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.post("/signup", multerUpload.single("avatar"), signUp);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/get-user", isLoggedIn, getLoggedInUser);

export { router as AuthRouter };
