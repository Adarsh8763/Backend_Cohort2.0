import React, { useState } from "react";
import "../styles/InputBox.scss";

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    onSendMessage(text);
    setMessage("");
  };

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <textarea
        className="input-box__textarea"
        placeholder="Ask a question..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows="2"
      />
      <button
        className="input-box__send-btn"
        type="submit"
        disabled={!message.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default InputBox;
