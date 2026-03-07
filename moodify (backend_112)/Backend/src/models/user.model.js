const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username should be unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email address should be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel