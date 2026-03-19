"use client";

import { SocketProvider } from "@/app/context/SocketContext";
import useSync from "@/hooks/useRealTimeRefresh";

export default function AdminClientWrapper({children}) {

    useSync();

    return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );


}