import { useSelector } from "react-redux"

const MessageBubble = ({ msg }) => {

  const user = useSelector(state => state.auth.user);  
  
  return (
    <div className={`bubble ${msg.sender === user._id ? "sender" : "receiver"}`}>
      {msg.message}
    </div>
  )
}

export default MessageBubble
