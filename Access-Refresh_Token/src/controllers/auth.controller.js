const userModel = require("../models/user.model")
const {generateAccessToken, generateRefreshToken} = require("../utils/generateTokens")

const registerContoller = async(req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isExistingUser = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isExistingUser){
        return res.status(409).json({
            message: "User with this username or email already exists",
        })
    }

    const user = await userModel.create({
        username: username,
        email: email,
        password: password
    })

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60*60*1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24*60*60*1000
    })
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60*60*1000
    })

    return res.status(201).json({
        message: "User registered successfully.",
        user: user
    })
}

const loginController = (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

}

module.exports = {
    registerContoller,
    loginController
}