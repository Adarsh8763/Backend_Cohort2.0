import config from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "5d" }
    )
    res.cookie("token", token)

    return res.status(201).json({
        message,
        "user": {
            "id": user._id,
            "fullname": user.fullname,
            "email": user.email,
            "contact": user.contact,
            "role": user.role
        }
    })
}

export const registerController = async (req, res) => {
    const { fullname, email, password, contact, isSeller } = req.body

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                "message": "User with the same email or contact already exists"
            })
        }

        const user = await userModel.create({
            fullname,
            email,
            password,
            contact,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully.")

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}   

export const loginController = async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            "message": "User not found."
        })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({
            "message": "Invalid credentials."
        })
    }

    await sendTokenResponse(user, res, "User Logged in successfully.")

}