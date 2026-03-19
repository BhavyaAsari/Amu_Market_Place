import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log(" Initializing Socket...");

    const io = new Server(res.socket.server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log(" Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log(" Disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
    globalThis.io = io; 
  }

  res.end();
}