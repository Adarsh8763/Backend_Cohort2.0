import { initializeSocketconnection } from "../service/chat.socket";
import { createNewChat, addNewMessage, setChats, setCurrentChatId, setLoading, setError } from "../chatSlice.js"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js"
import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch()

    async function handleSendMessage(message, chatId) {
        dispatch(setLoading(true))

        const data = await sendMessage(message, chatId)
        const { chat, aiMessage } = data

        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "user"
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role
        }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setLoading(false))
    }
    const
    return {
        initializeSocketconnection,
        handleSendMessage
    }
}