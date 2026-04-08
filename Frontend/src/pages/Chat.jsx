import { useState } from "react"
import ChatWindow from "../components/ChatWindow"
import Sidebar from "../components/Sidebar"
import Placeholder from "../components/Placeholder";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  console.log({selectedUser})

  return (
    <div className="chat">
      <Sidebar setSelectedUser={setSelectedUser} />
      {selectedUser ? 
        <ChatWindow selectedUser={selectedUser} />
        :
        <Placeholder />
      }
    </div>
  )
}

export default Chat
