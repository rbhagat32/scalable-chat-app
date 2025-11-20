"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-provider";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const { logout } = useUser();

  return (
    <div className="absolute top-1.5 right-1.5 z-50">
      <Button
        size="icon"
        variant="secondary"
        onClick={() => logout()}
        className="size-8 bg-gray-800 hover:bg-gray-900"
      >
        <LogOutIcon className="size-4" />
      </Button>
    </div>
  );
}
