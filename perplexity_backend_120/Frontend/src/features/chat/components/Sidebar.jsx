import "../styles/Chat.scss";

const Sidebar = ({ chats, activeChat, onSelectChat, onNewChat }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          + New Chat
        </button>
      </div>

      <div className="chats-list">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <p className="chat-name">{chat.title || "Untitled Chat"}</p>
              <span className="chat-preview">{chat.lastMessage || "No messages"}</span>
            </div>
          ))
        ) : (
          <p className="empty-message">No chats yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
