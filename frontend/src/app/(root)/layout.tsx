import { SocketProvider } from "@/context/socket-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description: "Start chatting !",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SocketProvider>{children}</SocketProvider>;
}
