import messageModel from "../models/message.model.js"
import chatModel from "../models/chat.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.service.js"

export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body

    let title = null, chat = null

    if (!chatId) {
        title = await generateChatTitle(message)
        console.log(title)

        chat = await chatModel.create({
            user: req.user.id,
            title: title
        })
    }

    const userMessage = await messageModel.create({
        chat: chat?._id || chatId,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({
        chat: chat?._id || chatId
    })

    const result = await generateResponse(messages)
    console.log(result)

    const aiMessage = await messageModel.create({
        chat: chat?._id || chatId,
        content: result,
        role: "ai"
    })

    res.json({
        aiMessage: result,
        title
    })
}

export async function getChats(req, res){
    const user = req.user

    const chats = await chatModel.find({
        user: user.id
    })

    res.status(200).json({
        message: "Chats fetched successfully",
        chats
    })
}

export async function getMessages(req, res) {
    const chatId = req.params.chatId

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages fetched successfully",
        messages
    })


}

export async function deleteChat(req, res){
    const chatId = req.params.chatId
    const user = req.user

    const chat = await chatModel.findOneAndDelete({
        user: user.id,
        _id: chatId
    })
    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully."
    })
}