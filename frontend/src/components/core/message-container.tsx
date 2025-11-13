"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/context/socket-provider";
import { SkeletonLoader } from "@/components/core/skeleton-loader";
import moment from "moment";
import Image from "next/image";

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
            className="mx-auto flex w-[380px] items-center justify-between gap-2 rounded-2xl bg-gray-800 px-10 py-4"
          >
            <div>
              <p className="break-words">{msg.content}</p>
              <p className="text-xs text-gray-400">{msg.user?.username}</p>
              <p className="text-xs text-gray-400">
                {moment(msg.createdAt).format("DD MMM YYYY [at] hh:mm A")}
              </p>
            </div>

            <Image
              src={msg.user?.avatarUrl || "/vercel.svg"}
              alt={msg.user?.avatarId || "Sender Avatar"}
              width={480}
              height={480}
              className="size-14 rounded-full border object-cover"
            />
          </div>
        ))
      )}
    </div>
  );
}
