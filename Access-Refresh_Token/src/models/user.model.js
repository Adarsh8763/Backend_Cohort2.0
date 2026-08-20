const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel