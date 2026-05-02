import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import "../styles/Chat.scss";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { handleSendMessage } = useChat();
  // const [chats, setChats] = useState([]);
  // const [activeChat, setActiveChat] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [loading, setLoading] = useState(false);

  const chats = useSelector((state) => state.chat.chats) 
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const messages = useSelector((state) => state.chat.chats[currentChatId]?.messages)

  // Initialize socket connection
  useEffect(() => {
    chat.initializeSocketconnection();
  }, []);

  // Handle new chat creation
  // const handleNewChat = () => {
  //   const newChat = {
  //     id: Date.now(),
  //     title: `Chat ${chats.length + 1}`,
  //     lastMessage: "",
  //   };
  //   setChats([newChat, ...chats]);
  //   setActiveChat(newChat);
  //   setMessages([]);
  // };

  // // Handle chat selection
  // const handleSelectChat = (chatId) => {
  //   const selectedChat = chats.find((c) => c.id === chatId);
  //   setActiveChat(selectedChat);
  //   // You'll fetch messages from Redux here
  //   setMessages([]);
  // };

  // // Handle message sending
  // const handleSendMessage = (messageText) => {
  //   if (!activeChat) return;

  //   // Add user message to state
  //   const userMessage = { role: "user", content: messageText };
  //   setMessages([...messages, userMessage]);
  //   setLoading(true);

    // You'll emit this through Socket.io to backend
    // chat.sendMessage(activeChat.id, messageText);
  };

  return (
    <div className="chat-container">
      <Sidebar
        chats={chats}
        currentChatIdChat={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow messages={messages} loading={loading} />
        <InputBox
          onSendMessage={handleSendMessage}
          disabled={!activeChat || loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
