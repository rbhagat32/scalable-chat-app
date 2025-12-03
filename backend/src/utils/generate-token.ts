import { cookieOptions } from "@/constants/cookie-options.js";
import type { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "15d",
  });

  res.cookie("TOKEN", token, cookieOptions);
};

export { generateToken };
