import { app, httpServer } from "@/init.js";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.js";
import { AuthRouter } from "@/routes/auth.js";
import { MessageRouter } from "@/routes/message.js";
import { ServerInfoRouter } from "@/routes/server-info.js";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

configDotenv({ quiet: true });

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/server-info", ServerInfoRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

app.use(ErrorHandlerMiddleware);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
