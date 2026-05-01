import React from "react";
import "../styles/Message.scss";

const Message = ({ message, isUser }) => (
  <div className={`message ${isUser ? "message--user" : "message--ai"}`}>
    <div className={`message__bubble ${isUser ? "message__bubble--user" : "message__bubble--ai"}`}>
      <p className="message__text">{message}</p>
    </div>
  </div>
);

export default Message;
