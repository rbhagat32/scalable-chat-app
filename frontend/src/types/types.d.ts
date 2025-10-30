interface IMessage {
  id: string;
  content: string;
  createdAt: Date;
}

interface IServerInfo {
  instanceId: string;
  port: number;
  status: string;
  timestamp: string;
}
