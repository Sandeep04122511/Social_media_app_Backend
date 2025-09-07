import { Server } from "socket.io";
import { EVENTS } from "../utils/constats.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] }
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;
    if (userId) socket.join(String(userId));

    socket.on("disconnect", () => {});
  });
};

export const getIO = () => io;

export const emitMessage = (toUserId, message) => {
  if (io) io.to(String(toUserId)).emit(EVENTS.NEW_MESSAGE, message);
};
