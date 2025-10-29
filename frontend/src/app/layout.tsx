import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "@/context/SocketProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description:
    "Next.js, Node.js, PostgreSQL, Prisma, Socket.io, Redis, Kafka, Docker",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SocketProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
      <Toaster richColors position="top-center" />
    </SocketProvider>
  );
}
