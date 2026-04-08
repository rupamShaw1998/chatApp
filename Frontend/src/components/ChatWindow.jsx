import MessageBubble from "./MessageBubble";
import { useEffect, useState } from "react";
import axios from "axios";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/${selectedUser._id}`,
          { headers: { Authorization: `Bearer ${authToken}` }}
        );
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getChatHistory();
  }, [selectedUser]);

  const sendMessage = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const messagePayload = {
        receiverId: selectedUser._id,
        message
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/send`,
        messagePayload,
        { headers: { Authorization: `Bearer ${authToken}` }}
      );
      setMessage("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
};

export default ChatWindow;
