import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chatSlice.js";
import "../styles/Chat.scss";
import { initializeSocketconnection } from "../service/chat.socket";
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const loading = useSelector((state) => state.chat.loading);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketconnection();
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return;
    chat.handleSendMessage(trimmedMessage, currentChatId);
    setChatInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage(e);
    }
  };

  const handleTextareaChange = (e) => {
    setChatInput(e.target.value);
    // Auto-resize textarea
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    setChatInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setSidebarOpen(false);
  };

  const currentMessages = chats[currentChatId]?.messages || [];
  const currentChatTitle = chats[currentChatId]?.title;
  const hasMessages = currentMessages.length > 0;
  const chatList = Object.values(chats);

  return (
    <main className="dashboard-main" id="dashboard">
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          id="sidebar-backdrop"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`} id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark">V</div>
            <span className="sidebar-logo-name">Vasuk AI</span>
          </div>
          <div className="sidebar-header-actions">
            <button
              type="button"
              className="new-chat-btn"
              onClick={handleNewChat}
              title="New chat"
              id="new-chat-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New chat
            </button>
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              id="sidebar-close-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar-section-label">Recent</div>

        <div className="chats-list" id="chats-list">
          {chatList.length === 0 ? (
            <p className="chats-empty">No conversations yet</p>
          ) : (
            chatList.map((chatItem, index) => (
              <div
                key={index}
                className="chat-item-wrapper"
              >
                <button
                  onClick={() => openChat(chatItem.chatId)}
                  type="button"
                  className={`chat-item ${chatItem.chatId === currentChatId ? "active" : ""}`}
                  id={`chat-item-${chatItem.chatId}`}
                >
                  <svg className="chat-item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="chat-item-title">{chatItem.title}</span>
                </button>
                <button
                  type="button"
                  className="chat-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    chat.handleDeleteChat(chatItem.chatId);
                  }}
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main content */}
      <section className="dashboard-content" id="dashboard-content">

        {/* Top bar */}
        <header className="content-header" id="content-header">
          <div className="content-header-left">
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              id="sidebar-toggle-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="content-header-title">
              {currentChatTitle ? (
                <span>{currentChatTitle}</span>
              ) : (
                <span className="content-header-placeholder">AI Search Assistant</span>
              )}
            </div>
          </div>
          <div className="content-header-actions">
            <div className="header-status-dot" title="Connected" />
          </div>
        </header>

        {/* Messages area */}
        <div className="messages-area" id="messages-area">
          {!hasMessages ? (
            /* Welcome screen */
            <div className="welcome-screen" id="welcome-screen">
              <div className="welcome-logo">
                <div className="welcome-logo-mark">V</div>
              </div>
              <h1 className="welcome-heading">What do you want to know?</h1>
              <p className="welcome-subtext">
                Ask me anything — I'll search, reason, and explain.
              </p>
              <div className="welcome-suggestions">
                {[
                  "Explain quantum computing simply",
                  "Latest developments in AI",
                  "How does the internet work?",
                  "Best practices in React 19",
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    type="button"
                    className="suggestion-pill"
                    onClick={() => {
                      setChatInput(suggestion);
                      textareaRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages feed */
            <div className="messages-feed" id="messages-feed">
              {currentMessages.map((message, index) => (
                <div
                  key={index}
                  className={`message-row ${message.role === "user" ? "message-row--user" : "message-row--ai"}`}
                >
                  {message.role !== "user" && (
                    <div className="message-avatar" aria-label="AI">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" opacity="0.3" />
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className={`message-bubble ${message.role === "user" ? "message-bubble--user" : "message-bubble--ai"}`}>
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="md-p">{children}</p>,
                          ul: ({ children }) => <ul className="md-ul">{children}</ul>,
                          ol: ({ children }) => <ol className="md-ol">{children}</ol>,
                          li: ({ children }) => <li className="md-li">{children}</li>,
                          code: ({ inline, children }) =>
                            inline ? (
                              <code className="md-code-inline">{children}</code>
                            ) : (
                              <code className="md-code-block">{children}</code>
                            ),
                          pre: ({ children }) => <pre className="md-pre">{children}</pre>,
                          h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
                          h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
                          h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
                          blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
                          a: ({ children, href }) => <a className="md-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                          strong: ({ children }) => <strong className="md-strong">{children}</strong>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="message-row message-row--ai">
                  <div className="message-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="loading-dots" aria-label="AI is thinking">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating prompt input */}
        <div className="prompt-wrapper" id="prompt-wrapper">
          <form
            onSubmit={handleSubmitMessage}
            className={`prompt-form ${chatInput.trim() ? "prompt-form--has-input" : ""}`}
            id="prompt-form"
          >
            {/* <h1>{loading ? "Loading" : "Not Loading"}</h1> */}
            <textarea
              ref={textareaRef}
              id="chat-input"
              value={chatInput}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              className="prompt-textarea"
              rows={1}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || loading}
              className="prompt-send-btn"
              id="send-btn"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <p className="prompt-hint">Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line</p>
        </div>

      </section>
    </main>
  );
};

export default Dashboard;

