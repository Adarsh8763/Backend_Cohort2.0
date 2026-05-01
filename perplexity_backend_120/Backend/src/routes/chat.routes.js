import { Router } from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { deleteChatController, getChatsController, getMessagesController, sendMessageController } from "../controllers/chat.controller.js";


const chatRouter = Router()

// @desc    Send message to AI and get response
// @route POST /api/chats/message
// @access Private
// @body { message }
chatRouter.post("/message", identifyUser, sendMessageController)

// @desc    Get all chats of a user
// @route GET /api/chats
// @access Private
chatRouter.get("/", identifyUser, getChatsController)

// @desc    Get all messages of a chat
// @route GET /api/chats/:chatId/messages
// @access Private
// @params chatId
chatRouter.get("/:chatId/messages", identifyUser, getMessagesController)

// @desc    Delete a chat
// @route DELETE /api/chats/delete/:chatId
// @access Private
// @params chatId
chatRouter.delete("/delete/:chatId", identifyUser, deleteChatController)

export default chatRouter