const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

async function registerController(req,res){
    const {username, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            msg: "User already exists with this " + (isUserAlreadyExists.username === username ? "username":"email")
        })
    }

    const hashPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username: username,
        email: email,
        password: hashPassword
    }) 

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        msg: "User registered sucessfully",
        user: {
            username: user.username,
            email: user.email,
        }
    })
}

async function loginController(req,res){
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")
    if(!user){
        return res.status(401).json({
            msg: "Invalid Credentials"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        return res.status(401).json({
            msg: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET,
        {expiresIn: "3d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        msg: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
        }
    })
}

async function getMeController(req,res){
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            msg: "User not found"
        })
    }
    
    res.status(200).json({
        msg: "User details fetched successfully",
        user 
    })
}

async function logoutContoller(req, res){

    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60*60)

    res.status(200).json({
        msg: "User logged out successfully"
    })
    
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutContoller
}