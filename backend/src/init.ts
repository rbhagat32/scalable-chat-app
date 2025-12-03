import { StartMessageConsumer } from "@/services/kafka.js";
import { SocketService } from "@/services/socket.js";
import { configDotenv } from "dotenv";
import express from "express";
import http from "http";

configDotenv({ quiet: true });

const app = express();
const httpServer = http.createServer(app);

const socketService = new SocketService();
socketService.get_io().attach(httpServer);
socketService.initListeners();

StartMessageConsumer();

export { app, httpServer };
