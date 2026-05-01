import React, { useEffect, useRef } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import "../styles/ChatWindow.scss";

const ChatWindow = ({ messages = [], onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <h1 className="chat-window__title">Conversation</h1>
      </header>

      <div className="chat-window__messages">
        {messages.length === 0 ? (
          <div className="chat-window__empty">
            <p>Send a message to start the conversation.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg.text} isUser={msg.isUser} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-window__footer">
        <InputBox onSendMessage={onSendMessage} />
      </div>
    </section>
  );
};

export default ChatWindow;
