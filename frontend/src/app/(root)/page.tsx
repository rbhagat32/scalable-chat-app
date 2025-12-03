import { LogoutButton } from "@/components/core/logout-button";
import { MessageContainer } from "@/components/core/message-container";
import { MessageInput } from "@/components/core/message-input";
import { Navbar } from "@/components/core/navbar";
import { ServerInfo } from "@/components/core/server-info";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="relative flex h-[780px] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl">
        <Navbar />
        <LogoutButton />
        <ServerInfo />
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  );
}
