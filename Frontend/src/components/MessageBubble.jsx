import { useSelector } from "react-redux"

const MessageBubble = ({ msg }) => {

  const user = useSelector(state => state.auth.user);

  console.log({msg, user});
  
  return (
    <>
      <div className={msg.sender == user.id ? "right" : "left"}>
        {msg.message}
      </div>
    </>
  )
}

export default MessageBubble
