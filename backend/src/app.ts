import http from "http";
import dotenv from "dotenv";
import { SetupServer } from "@/config/http-server.js";
import { SocketService } from "@/services/socket.js";
import { StartMessageProducer } from "@/services/kafka.js";

dotenv.config();

function init() {
  const httpServer = http.createServer(SetupServer);

  const socketService = new SocketService();
  socketService.get_io().attach(httpServer);

  StartMessageProducer();

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  socketService.initListeners();
}

init();
