const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerController (req, res){
    const {username, email, password, bio} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if (isUserAlreadyExists){
        return res.status(409).json({
            msg: "User already exists with this " + (isUserAlreadyExists.username === username ? "username": "email")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password:hash, bio
    })

    const token = jwt.sign(
        {
            id: user._id
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        msg: "User Registered",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
}

async function loginController (req,res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if (!user){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched){
        return res.status(401).json({
            msg: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token)

    res.status(200).json({
        msg: "User logged in",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
}


module.exports = {
    registerController,
    loginController
}