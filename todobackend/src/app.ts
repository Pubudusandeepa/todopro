import express, { Request, Response } from "express";
import mongoose from "mongoose";
import todoRoute from "./routes/todoRoute";
import { Server } from "socket.io";




import cors from "cors";
import http from "http";
import User from "./models/todo";
import { setupSocketIO } from "./socket/socket";




// Initialize the app
const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// Add to your middleware
// app.use((req, res, next) => {
//   (req as any).io = io;
//   next();
// });

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Socket.IO middleware with proper typing


app.use((req, res, next) => {
  (req as any).io = io; // Attach `io` to the request object
  next();
});


// Connect to MongoDB
const dbURI = "mongodb://localhost:27017/todoApp"; // Replace with your MongoDB URI
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware to pass `io` to routes

// Use Routes
app.use("/api/todos", todoRoute);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Node.js with TypeScript and MongoDB!");
});



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id); // This should log when a connection is made
  
  socket.on("connect", () => {
    console.log("Socket connected to server with ID:", socket.id);
  });

  socket.emit("todoUpdated",{ _id: "123", name: "Test Todo", email: "test@email.com" });

  socket.on("todoUpdated", (updatedTodo) => {
    console.log("Todo updated:", updatedTodo);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});



// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
