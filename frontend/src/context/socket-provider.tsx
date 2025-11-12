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
import { api } from "@/utils/axios";
import { useUser } from "./user-provider";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ISocketContext {
  sendMessage: (msg: string) => void;
  messages: IMessage[];
  serverInfo: IServerInfo | null;
  loading: boolean;
}

const SocketContext = createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [serverInfo, setServerInfo] = useState<IServerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const fetchServerInfo = useCallback(async () => {
    try {
      const res = await api.get<IServerInfo>("/api/server-info");
      if (res.status !== 200) throw new Error("Failed to Fetch Server Info !");

      setServerInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: string) => {
      if (socket && user?.id)
        socket.emit("event:message", { content: msg, userId: user.id });
    },
    [socket, user]
  );

  const messageReceived = useCallback((msg: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  }, []);

  useEffect(() => {
    const _socket = io(SERVER_URL, {
      transports: ["websocket"],
      upgrade: true,
      rememberUpgrade: true,
    });

    setSocket(_socket);
    fetchServerInfo();

    _socket.on("emit:message", messageReceived);

    return () => {
      _socket.off("emit:message", messageReceived);
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await api.get<IMessage[]>("/api/messages");
        if (res.status !== 200) throw new Error("Failed to Fetch Messages !");

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      setMessages([]);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ sendMessage, messages, serverInfo, loading }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state)
    throw new Error("useSocket must be used within a SocketProvider !");

  return state;
};

export { SocketProvider, useSocket };
