import ChatWindow from "../components/ChatWindow"
import Sidebar from "../components/Sidebar"

const Chat = () => {
  return (
    <div className="chat">
      <Sidebar />
      <ChatWindow />
    </div>
  )
}

export default Chat