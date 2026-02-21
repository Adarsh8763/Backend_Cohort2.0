const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "With this email id user already exits"]
    },
    password: String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel