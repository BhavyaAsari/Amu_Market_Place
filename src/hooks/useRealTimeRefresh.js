"use client";

import { useEffect } from "react";
import { useSocket } from "@/app/context/SocketContext";
import { useRouter } from "next/navigation";

export default function useSync() {
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    console.log("🧠 Sync active");

    socket.on("new-order", () => {
      console.log("🔥 Order update received");
      router.refresh();
    });

    socket.on("product-update", () => {
      router.refresh();
    });

    socket.on("user-update", () => {
      router.refresh();
    });

    return () => {
      socket.off("new-order");
      socket.off("product-update");
      socket.off("user-update");
    };
  }, [socket,router]);
}