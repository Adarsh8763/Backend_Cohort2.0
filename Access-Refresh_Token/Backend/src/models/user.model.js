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

userSchema.pre("save", function(){
    if(!this.isModified("password")) return
    const hash = bcrypt.hashSync(this.password, 10)
    this.password = hash;
})

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("users", userSchema)

module.exports = userModel