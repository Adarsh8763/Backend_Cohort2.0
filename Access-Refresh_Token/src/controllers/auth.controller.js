const userModel = require("../models/user.model")
const { registerService, loginService, getAccessTokenService } = require("../services/auth.service");

const registerContoller = async(req, res) => {
    const {accessToken, refreshToken, user} = await registerService(req.body);

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

    return res.status(201).json({
        message: "User registered successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const loginController = async (req, res) => {
    const {accessToken, refreshToken, user} = await loginService(req.body)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60*60*1000
    })

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24*60*60*1000
    })

    return res.status(201).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const getAccessTokenController = async (req, res) => {
    const refershToken = req.cookies.refreshToken
    if(!refershToken){
        return res.status(401).json({
            message: "Unauthorized request"
        })
    }

    const accessToken = await getAccessTokenService(refreshToken)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60*60*1000
    })

    return res.status(200).json({
        message: "Access token generated"
    })
}

module.exports = {
    registerContoller,
    loginController,
    getAccessTokenController
}