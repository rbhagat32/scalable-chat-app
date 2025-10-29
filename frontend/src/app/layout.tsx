import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { SocketProvider } from "@/context/socket-provider";

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description:
    "Next.js, Express.js, PostgreSQL, Prisma, Socket.io, Redis, Kafka, Docker",
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
