import http from "http";
import express from "express";
import { configDotenv } from "dotenv";
import { SocketService } from "@/services/socket.js";
import { StartMessageConsumer } from "@/services/kafka.js";

configDotenv({ quiet: true });

const app = express();
const httpServer = http.createServer(app);

const socketService = new SocketService();
socketService.get_io().attach(httpServer);
socketService.initListeners();

StartMessageConsumer();

export { app, httpServer };
