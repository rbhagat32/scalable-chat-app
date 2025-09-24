import { app, httpServer } from "@/init.js";
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.js";
import { MessageRouter } from "@/routes/message.js";
import { ServerInfoRouter } from "@/routes/server-info.js";

configDotenv({ quiet: true });

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/server-info", ServerInfoRouter);
app.use("/api/messages", MessageRouter);

app.use(ErrorHandlerMiddleware);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
