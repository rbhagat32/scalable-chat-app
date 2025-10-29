import { NavBar } from "@/components/navbar";
import { MessageContainer } from "@/components/message-container";
import { MessageInput } from "@/components/message-input";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="relative flex h-[700px] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl">
        <NavBar />
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  );
}
