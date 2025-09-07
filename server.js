import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to MongoDB
connectDB?.();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* -------------------- 🔹 Socket.io Setup -------------------- */
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`⚡ User disconnected: ${socket.id}`);
  });

  // Example: Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Example: Send a message to a room
  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });
});

/* -------------------- 🔹 Manual Test Routes -------------------- */
app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "🚀 API is running",
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV,
    testRoutes: {
      server: "/api/test/server",
      mongodb: "/api/test/db",
    },
  });
});

app.get("/api/test/server", (req, res) => {
  res.json({
    status: "success",
    message: `✅ Server is running on port ${process.env.PORT || 5000}`,
    time: new Date().toISOString(),
  });
});

app.get("/api/test/db", (req, res) => {
  if (!global.mongooseConnection) {
    return res.status(500).json({
      status: "error",
      message: "❌ MongoDB not connected",
    });
  }
  res.json({
    status: "success",
    message: "✅ MongoDB connected successfully",
    host: global.mongooseConnection.connection.host,
    dbName: global.mongooseConnection.connection.name,
  });
});

/* -------------------- 🔹 API Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

/* -------------------- 🔹 Error Handling -------------------- */
app.use(notFound);
app.use(errorHandler);

/* -------------------- 🔹 Start Server -------------------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

/* -------------------- 🔹 Graceful Shutdown -------------------- */
process.on("SIGINT", async () => {
  if (global.mongooseConnection) {
    await global.mongooseConnection.connection.close();
    console.log("🛑 MongoDB disconnected. Server shutting down.");
  }
  server.close(() => {
    console.log("🛑 Server stopped.");
    process.exit(0);
  });
});

export { io };
export default app;
