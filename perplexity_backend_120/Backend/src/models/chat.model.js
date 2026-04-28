import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required for creating a chat"]
    },
    title: {
        type: String,
        default: "New Chat"
    }
},{
    timestamps: true
})

const chatModel = mongoose.model("chats", chatSchema)

export default chatModel