import type { NextFunction, Response } from "express";
import type { RequestWithUser } from "@/types/types.js";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/prisma.js";
import { cookieOptions } from "@/constants/cookie-options.js";

interface JwtPayloadTypes {
  userId: string;
  iat: number;
  exp: number;
}

const isLoggedIn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.TOKEN;
    if (!token) return res.status(401).json({ message: "Please login to continue !" });

    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayloadTypes;

    const user = await prisma.user.findUnique({ where: { id: loggedInUser.userId } });
    if (!user) {
      return res
        .status(401)
        .cookie("TOKEN", "", { ...cookieOptions, expires: new Date(Date.now()) })
        .json({ message: "User does not exist. Please login again !" });
    }

    req.userId = loggedInUser.userId;
    next();
  } catch {
    return res
      .status(401)
      .cookie("TOKEN", "", { ...cookieOptions, expires: new Date(Date.now()) })
      .json({ message: "Session expired. Please login again !" });
  }
};

export { isLoggedIn };
