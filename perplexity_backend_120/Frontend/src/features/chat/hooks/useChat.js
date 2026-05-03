import { initializeSocketconnection } from "../service/chat.socket";
import { createNewChat, addNewMessage, setChats, setCurrentChatId, setLoading, setError, addMessages } from "../chatSlice.js"
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

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reverse().reduce((acc, chat) => {
            acc[chat._id] = {
                chatId: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
            }
            return acc
        },{})))
    }

    async function handleOpenChat(chatId, chats){
        if(chats[chatId]?.messages.length === 0){
            
            const data = await getMessages(chatId)
            const {messages} = data
    
            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
    
            dispatch(addMessages({
                chatId,
                messages: formattedMessages
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketconnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}
