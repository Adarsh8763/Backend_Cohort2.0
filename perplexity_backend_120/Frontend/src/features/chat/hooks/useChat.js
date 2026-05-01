import { initializeSocketconnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentId, setIsLoading, setError, createNewChat, addNewMessage } from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = ()=> {
    const dispatch = useDispatch()

    async function handleSendMessage (message, chatId){
        dispatch(setIsLoading(true))
        const data = await sendMessage(message, chatId)
        const {chat, aiMessage} = data
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title,
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
        dispatch(setCurrentId(chat._id))
        dispatch(setIsLoading(false))
    }

    return {
        initializeSocketconnection,
        handleSendMessage
    }
}