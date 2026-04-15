import MessageBubble from "./MessageBubble";
import { useEffect, useState } from "react";
import { CircleUserRound, Send } from 'lucide-react'
import axios from "axios";
import useAsync from "../hooks/useAsync";
import { useSelector } from "react-redux";
import { socket } from "../socket";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { loading, run } = useAsync();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    socket.connect();
    socket.emit("register", user._id);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("RECEIVED ON FRONTEND:", msg);

      if(msg.sender.toString() === selectedUser._id.toString()) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage")
    }
  }, [selectedUser]);

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await run(() => 
          axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/api/${selectedUser._id}`,
            { headers: { Authorization: `Bearer ${authToken}` }}
          )
        );
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getChatHistory();
  }, [selectedUser]);

  const sendMessage = async () => {
    if(!message.trim()) return;

    const authToken = localStorage.getItem("token");
    const messagePayload = {
      receiverId: selectedUser._id,
      message
    };

    const newMsg = {
      _id: Date.now(),
      sender: user._id,
      receiver: selectedUser._id,
      message,
    };

    setMessages(prev => [...prev, newMsg]);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/send`,
        messagePayload,
        { headers: { Authorization: `Bearer ${authToken}` }}
      );

      console.log("EMITTING:", newMsg);
      socket.emit("sendMessage", newMsg);
      console.log("msg response:", response);
    } catch (error) {
      console.log(error);
      setMessages(prev => prev.filter(msg => msg._id !== newMsg._id));
    }
  };

  return (
    <div className="chat-window">
      <div className="profile">
        <CircleUserRound size={20} />
        {selectedUser.username}
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
      </div>
      <div className="msg-action">
        <input
          name="message-input"
          className="message-input"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage()}
          disabled={loading || !message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
