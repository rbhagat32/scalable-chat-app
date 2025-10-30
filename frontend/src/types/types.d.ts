interface IMessage {
  id: string;
  content: string;
  createdAt: Date;
}

interface IServerInfo {
  instanceId: string;
  status: string;
  timestamp: Date;
}
