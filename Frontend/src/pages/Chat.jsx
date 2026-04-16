import { useEffect, useState } from "react"
import ChatWindow from "../components/ChatWindow"
import Sidebar from "../components/Sidebar"
import Placeholder from "../components/Placeholder";
import { socket } from "../socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const user = useSelector(state => state.auth.user);

  

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log("Online Users: ", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    }
  }, []);

  return (
    <div className="chat">
      <Sidebar setSelectedUser={setSelectedUser} onlineUsers={onlineUsers} />
      {selectedUser ? 
        <ChatWindow selectedUser={selectedUser} onlineUsers={onlineUsers} />
        :
        <Placeholder />
      }
    </div>
  )
}

export default Chat
