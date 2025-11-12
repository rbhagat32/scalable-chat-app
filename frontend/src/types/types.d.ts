interface IServerInfo {
  instanceId: string;
  status: string;
  timestamp: Date;
}

interface IUser {
  id: string;
  username: string;
  password?: string | null;
  avatarId: string | null;
  avatarUrl: string | null;
  messages: IMessage[];
  createdAt: Date;
}

interface IMessage {
  id: string;
  content: string;
  userId: string;
  user?: IUser;
  createdAt: Date;
}
