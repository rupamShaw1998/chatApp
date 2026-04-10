import { Server } from "socket.io";

let io;
const onlineUsers = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });
  });

  return io;
};

export const getIO = () => io;
export { onlineUsers };
