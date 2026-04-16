import { Message } from "../models/message.model.js";
import { getIO, onlineUsers } from "../sockets/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const io = getIO();

    const { receiverId, message } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      message,
    });

    const senderSocketId = onlineUsers[req.user.id];
    const receiverSocketId = onlineUsers[receiverId];

    if(senderSocketId) {
      io.to(senderSocketId).emit("messageSent", newMessage);
    }

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    return res.status(201).send(newMessage);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { senderId } = req.params;

    await Message.updateMany(
      { sender: senderId, receiver: req.user.id, isSeen: false },
      { isSeen: true }
    );

    res.json({ message: "Messages marked as seen" });
  } catch (error) {
    res.status(500).json({ message: "Error updating messages" });
  }
};
