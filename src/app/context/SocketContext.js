"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketInstance;

    const initSocket = async () => {
      // Start socket server
      await fetch("/api/socket");

      socketInstance = io({
        path: "/api/socket/io",
      });

      socketInstance.on("connect", () => {
        console.log("🔥 Connected:", socketInstance.id);
      });

      setSocket(socketInstance);
    };

    initSocket();

    return () => {
      socketInstance?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);