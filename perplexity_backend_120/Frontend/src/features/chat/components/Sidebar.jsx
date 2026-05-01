import React from "react";
import { useSelector } from "react-redux";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  const chats = useSelector((state) => state.chat.chats || {});
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chatEntries = Object.entries(chats);

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Chats</h2>
      </div>

      <div className="sidebar__list">
        {chatEntries.length === 0 ? (
          <div className="sidebar__empty">No chats yet</div>
        ) : (
          chatEntries.map(([id, chat]) => (
            <div
              key={id}
              className={`sidebar__item ${id === currentChatId ? "sidebar__item--active" : ""}`}
            >
              <span className="sidebar__item-title">
                {chat.title || "New chat"}
              </span>
              <span className="sidebar__item-snippet">
                {chat.messages?.[chat.messages.length - 1]?.content || "Send a message"}
              </span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
