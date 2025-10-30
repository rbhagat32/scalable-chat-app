"use client";

import { useSocket } from "@/context/socket-provider";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";

export function ServerInfo() {
  const { serverInfo } = useSocket();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="absolute top-2 right-2 z-50">
      {!isOpen && (
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsOpen(true)}
          className="size-8 bg-gray-800 hover:bg-gray-900"
        >
          <Info className="size-4" />
        </Button>
      )}

      {isOpen && (
        <div
          ref={panelRef}
          className="rounded-xl border bg-gray-900 p-3 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold">Server Info</h4>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="size-6 bg-gray-800 hover:bg-gray-900"
            >
              <X className="size-4" />
            </Button>
          </div>

          <ul className="max-h-60 overflow-y-auto text-sm">
            <li className="mb-2 rounded-md bg-gray-800 p-2">
              Instance ID: {serverInfo?.instanceId}
            </li>
            <li className="mb-2 rounded-md bg-gray-800 p-2">
              Status: {serverInfo?.status}
            </li>
            <li className="mb-2 rounded-md bg-gray-800 p-2">
              Timestamp: {serverInfo?.timestamp}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
