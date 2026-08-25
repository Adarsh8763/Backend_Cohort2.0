const userModel = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens")

const registerService = async (data) => {
    try {
        const { username, email, password } = data;

        if (!username || !email || !password) {
            throw new Error("All fields are required")
        }

        const isExistingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isExistingUser) {
            throw new Error("User with this username or email already exists")
        }

        const user = await userModel.create({
            username: username,
            email: email,
            password: password
        })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        return {
            accessToken,
            refreshToken,
            user
        }
    }
    catch (err) {
        throw new Error(err)
    }
}

const loginService = async (data) => {
    try {
        const { email, password } = data

        if (!email || !password) {
            throw new Error("All fields are required")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            throw new Error("Invalid credentials")
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        return {
            accessToken,
            refreshToken,
            user
        }
    }
    catch (err) {
        throw new Error(err)
    }
}

const getAccessTokenService = async (refreshToken) => {
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    if(!decode){
        throw new Error("Unauthorized") 
    }

    const user = await userModel.findById(decode.id)

    if(!user){
        throw new Error("Unauthorized")
    }

    if(refreshToken !== user.refreshToken){
        throw new Error("Unauthorized")
    }

    const accessToken = generateAccessToken(user._id)

    return accessToken
}

module.exports = {
    registerService,
    loginService,
    getAccessTokenService
}