import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "@/context/SocketProvider";

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description: "A scalable chat application built with Next.js and Socket.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
        <body className="antialiased">{children}</body>
      </SocketProvider>
    </html>
  );
}
