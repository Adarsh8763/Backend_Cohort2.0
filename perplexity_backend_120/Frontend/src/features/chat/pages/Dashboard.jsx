import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import "../styles/Dashboard.scss";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const { handleSendMessage, initializeSocketconnection } = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const messages = chats[currentChatId]?.messages || [];

  useEffect(() => {
    initializeSocketconnection();
  }, []);

  // Transform messages for ChatWindow (expects {text, isUser})
  const transformedMessages = messages.map((msg) => ({
    text: msg.content,
    isUser: msg.role === "user",
  }));


  return (
    <div className="dashboard">
      <div className="dashboard__layout">
        <Sidebar />
        <ChatWindow
          messages={transformedMessages}
          onSendMessage={(message) => handleSendMessage(message, currentChatId)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
