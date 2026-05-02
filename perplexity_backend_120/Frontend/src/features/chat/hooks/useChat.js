import { initializeSocketconnection } from "../service/chat.socket";
import { createNewChat, addNewMessage, setChats, setCurrentChatId, setLoading, setError } from "../chatSlice.js"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js"
import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch()

    async function handleSendMessage(message, chatId) {
        try {
            dispatch(setLoading(true))
            const data = await sendMessage(message, chatId)
            const { chat, aiMessage, result } = data

            const actualChatId = chat?._id || chatId

            if (chat) {
                dispatch(createNewChat({
                    chatId: actualChatId,
                    title: chat.title
                }))
            }

            dispatch(addNewMessage({
                chatId: actualChatId,
                content: message,
                role: "user"
            }))

            dispatch(addNewMessage({
                chatId: actualChatId,
                content: aiMessage.content,
                role: aiMessage.role
            }))

            dispatch(setCurrentChatId(actualChatId))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to send message"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        initializeSocketconnection,
        handleSendMessage
    }
}
