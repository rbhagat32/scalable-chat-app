"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/context/socket-provider";
import { SkeletonLoader } from "@/components/skeleton-loader";
import moment from "moment";

export function MessageContainer() {
  const { messages, loading } = useSocket();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="relative mb-18 flex-1 space-y-3 overflow-auto p-4"
    >
      {loading ? (
        <SkeletonLoader />
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className="mx-auto flex w-[300px] flex-col gap-2 rounded-2xl bg-gray-800 p-4"
          >
            <p className="break-words">{msg.content}</p>
            <p className="text-xs text-gray-400">
              {moment(msg.createdAt).format("DD MMM YYYY [at] hh:mm A")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
