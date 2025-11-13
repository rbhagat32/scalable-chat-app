import type { Request } from "express";

export interface RequestWithUser extends Request {
  userId?: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  avatarId: string | null;
  avatarUrl: string | null;
  messages?: IMessage[];
  createdAt: Date;
}

export interface IMessage {
  id: string;
  content: string;
  userId: string;
  user: IUser | null;
  createdAt: Date;
}

export interface FileProps {
  mimetype: string;
  buffer: Buffer;
}
