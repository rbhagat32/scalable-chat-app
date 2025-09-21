"use client";

import { useSocket } from "@/context/SocketProvider";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Page() {
  const { sendMessage, messages, loading } = useSocket();
  const [message, setMessage] = useState<string>("");

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast.error("Cannot send empty message !");
    } else {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="relative flex h-[700px] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl">
        <div className="border-b border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
          <h1 className="text-center text-lg font-medium text-gray-100">
            Scalable Chat App
          </h1>
        </div>

        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="scrollbar-hide mb-18 flex-1 space-y-3 p-4"
        >
          {loading ? (
            <SkeletonLoader />
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="mx-auto w-[280px] rounded-2xl bg-gray-800 px-3 py-2 text-gray-100 shadow-lg"
              >
                <p className="text-sm break-words">{msg}</p>
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        <div className="absolute bottom-0 w-full border-t border-gray-800 bg-gray-900/30 p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-400 transition-all duration-200 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="cursor-pointer rounded-xl bg-gray-800 p-2.5 text-gray-200 shadow-lg transition-all duration-200 hover:bg-gray-700 hover:shadow-xl active:bg-gray-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5l7 7-7 7M5 12h14"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonLoader = () => {
  return [...Array(11)].map((_, index) => (
    <div
      key={index}
      className="mx-auto h-9 w-[280px] animate-pulse rounded-2xl bg-gray-800 px-3 py-2 text-gray-100 shadow-lg"
    />
  ));
};
