"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isPending}>
      {isPending ? <LoaderCircle className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      Cerrar sesión
    </Button>
  );
}
