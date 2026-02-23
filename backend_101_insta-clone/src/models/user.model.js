const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "User already exists with this username"]
    },
    email: {
        type: String,
        unique: [true, "User already exists withe this email"],
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/akk8763/default%20ProfileImg.avif?updatedAt=1771732347168"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel