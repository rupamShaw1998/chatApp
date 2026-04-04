import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const selectedUser = {username: "Rupam"}
const messages = [{ _id: 1, message: "hi chat"},{ _id: 2, message: "hello..."}];

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <h3>{selectedUser.username}</h3>

      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg.message} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;
