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

module.exports = {
    registerService,
    loginService
}