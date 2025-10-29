"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/context/socket-provider";
import { SkeletonLoader } from "@/components/skeleton-loader";

export function MessageContainer() {
  const { messages, loading } = useSocket();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="mb-18 flex-1 space-y-3 overflow-auto p-4"
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
  );
}
