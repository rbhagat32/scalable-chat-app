import { ServerInfo } from "@/components/core/server-info";
import { NavBar } from "@/components/core/navbar";
import { MessageContainer } from "@/components/core/message-container";
import { MessageInput } from "@/components/core/message-input";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="relative flex h-[750px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl">
        <NavBar />
        <ServerInfo />
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  );
}
