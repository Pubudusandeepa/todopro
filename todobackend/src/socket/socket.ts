import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export function setupSocketIO(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      
    },
    pingTimeout: 60000, // Close connection after 60s of inactivity
   
   
  });

  // Connection handling
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Handle todo events
    socket.on("joinTodo", (todoId: string) => {
      socket.join(`todo:${todoId}`);
      console.log(`Client ${socket.id} joined todo:${todoId}`);
    });

    socket.on("leaveTodo", (todoId: string) => {
      socket.leave(`todo:${todoId}`);
      console.log(`Client ${socket.id} left todo:${todoId}`);
    });

    // Handle todo updates
    socket.on("todoUpdated", (data) => {
      // Broadcast to all clients in the todo room except sender
      socket.to(`todo:${data.todoId}`).emit("todoUpdated", data);
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected:`, reason);
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  return io;
}