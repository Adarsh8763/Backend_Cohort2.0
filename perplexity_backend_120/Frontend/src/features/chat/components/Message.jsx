const Message = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`message-wrapper ${isUser ? "user-message" : "ai-message"}`}>
      <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
        <p className="message-text">{content}</p>
      </div>
    </div>
  );
};

export default Message;
