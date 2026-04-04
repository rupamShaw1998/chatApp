
const MessageBubble = ({ msg }) => {
  
  return (
    <>
      <div className={msg == "hello..." ? "right" : "left"}>
        {msg}
      </div>
    </>
  )
}

export default MessageBubble
