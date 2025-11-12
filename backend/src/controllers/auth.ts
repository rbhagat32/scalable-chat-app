import type { Request, Response } from "express";
import { TryCatch } from "@/utils/try-catch.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { prisma } from "@/config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/generate-token.js";
import { cookieOptions } from "@/constants/cookie-options.js";
import type { FileProps, RequestWithUser } from "@/types/types.js";
import { uploadToCloudinary } from "@/utils/cloudinary.js";

const signUp = TryCatch(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const avatar = req.file;

  if (!username?.trim() || !password?.trim())
    throw new ErrorHandler(400, "All fields are required !");

  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) throw new ErrorHandler(400, "Username already taken !");

  const { public_id, url } = await uploadToCloudinary(avatar as FileProps);

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 10),
      avatarId: public_id,
      avatarUrl: url,
    },
  });

  if (createdUser) {
    generateToken(res, createdUser.id);
    return res.status(201).json({ message: "Account created successfully !" });
  }
});

const login = TryCatch(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim())
    throw new ErrorHandler(400, "All fields are required !");

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) throw new ErrorHandler(401, "Invalid username or password !");

  const result = await bcrypt.compare(password, user.password);
  if (!result) throw new ErrorHandler(401, "Invalid username or password !");

  generateToken(res, user.id);
  return res.status(200).json({ message: `Welcome ${username} !` });
});

const logout = (_req: Request, res: Response) => {
  res
    .status(200)
    .cookie("TOKEN", "", { ...cookieOptions, expires: new Date(Date.now()) })
    .json({ message: "Logged out successfully !" });
};

const getLoggedInUser = TryCatch(async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  if (!userId) throw new ErrorHandler(401, "Unauthenticated !");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      password: false,
      avatarId: true,
      avatarUrl: true,
      messages: false,
      createdAt: true,
    },
  });

  if (!user) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(user);
});

export { signUp, login, logout, getLoggedInUser };
