import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user-provider";

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description:
    "Next.js, Express.js, PostgreSQL, Prisma, Socket.io, Redis, Kafka, Docker",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className="dark antialiased">{children}</body>
      </html>
      <Toaster richColors position="top-center" />
    </UserProvider>
  );
}
