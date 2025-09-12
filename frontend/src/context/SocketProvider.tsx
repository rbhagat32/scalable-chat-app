"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SocketProviderProps {
  children?: ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => void;
  messages: string[];
  loading: boolean;
}

interface IMessage {
  id: string;
  content: string;
  createdAt: string;
}

const SocketContext = createContext<ISocketContext | null>(null);

const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("useSocket must be used within a SocketProvider");
  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: string) => {
      console.log(`Sending Message to Server: ${msg}`);

      if (socket) socket.emit("event:message", { message: msg });
    },
    [socket]
  );

  const messageReceived = useCallback((msg: string) => {
    console.log("Message Received from Server:", msg);

    setMessages((prevMessages) => [...prevMessages, msg]);
  }, []);

  useEffect(() => {
    const _socket = io(SERVER_URL);
    setSocket(_socket);

    _socket.on("message", messageReceived);

    return () => {
      _socket.off("message", messageReceived);
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/api/messages`);
        if (!res.ok) throw new Error("Failed to Fetch Messages !");

        const data: IMessage[] = await res.json();
        setMessages(data.map((msg) => msg.content));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages, loading }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
