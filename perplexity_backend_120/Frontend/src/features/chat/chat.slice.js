import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState:{
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
    }, 
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                chatId,
                title,
                messages: [],
                lastUpdated: new Date.toISOString()
            }
            state.currentChatId = chatId 
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[chatId].messages.push({content, role})
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentId: (state, action) =>{
            state.currentChatId = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        } 
    }
})

export const { setChats, setCurrentId, setIsLoading, setError, createNewChat, addNewMessage } = chatSlice.actions
export default chatSlice.reducer