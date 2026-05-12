import { config } from "dotenv"
import userModel from "../models/user.model.js"

function sendTokenResponse(user, res) {
    const token = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "5d" }
    )
    res.cookie("token", token)
}

export const registerController = async (req, res) => {
    const { fullname, email, password, contact } = req.body

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

        const user = new userModel.create({
            fullname,
            email,
            password,
            contact
        })

        sendTokenResponse(user, res)

        return res.status(201).json({
            "message": "User registered successfully",
            "user": {
                "id": user._id,
                "fullname": user.fullname,
                "email": user.email,
                "contact": user.contact
            }
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}   