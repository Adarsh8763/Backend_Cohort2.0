import { useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindow = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages && messages.length > 0 ? (
        <div className="messages-container">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="loading-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="empty-chat">
          <p>Start a new conversation</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
