import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "chats",
        required: [true, "Chat is required to for a message"]
    },
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ai", "user"]
    }
})

const messageModel = mongoose.model("msgs", messageSchema)

export default messageModel