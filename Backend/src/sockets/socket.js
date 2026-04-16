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
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });

    // socket.on("sendMessage", (msg) => {
    //   console.log("MESSAGE RECEIVED ON SERVER:", msg);

    //   const receiverSocketId = onlineUsers[msg.receiver];
  
    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("receiveMessage", msg);
    //   }
    // });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });

  return io;
};

export const getIO = () => io;
export { onlineUsers };
