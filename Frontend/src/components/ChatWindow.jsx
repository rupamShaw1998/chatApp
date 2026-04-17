import MessageBubble from "./MessageBubble";
import { useEffect, useRef, useState } from "react";
import { CircleUserRound, Send } from 'lucide-react'
import axios from "axios";
import useAsync from "../hooks/useAsync";
import { useSelector } from "react-redux";
import { socket } from "../socket";

const ChatWindow = ({ selectedUser, onlineUsers }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const { loading, run } = useAsync();
  const user = useSelector(state => state.auth.user);

  const bottomRef = useRef();

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typing", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        setTyping(true);
      }
    });
  
    socket.on("stopTyping", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        setTyping(false);
      }
    });
  
    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedUser]);

  let typingTimeout;

  const typingHandler = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      senderId: user._id,
      receiverId: selectedUser._id
    });

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: user._id,
        receiverId: selectedUser._id
      });
    }, 1000);
  };

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

      // socket.emit("sendMessage", newMsg);
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
        {onlineUsers.includes(selectedUser._id) && (
          <span className="online">
            {typing ? "Typing..." : "Online"}
          </span>
        )}
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="msg-action">
        <input
          name="message-input"
          className="message-input"
          placeholder="Enter your message..."
          value={message}
          onChange={typingHandler}
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
