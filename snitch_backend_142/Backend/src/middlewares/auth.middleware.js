import jwt from "jsonwebtoken"
import config from "../config/config.js"
import userModel from "../models/user.model.js"

export const identifyUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized access."
        })
    }

    let decoded
    try {
        decoded = jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            "message": "Unauthorized user.",
            error
        })
    }

    req.user = decoded
    next()
}

export const identifySeller = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized access."
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    if (!user) {
        return res.status(401).json({
            "message": "Unauthorized access."
        })
    }

    if (user.role !== "seller") {
        return res.status(403).json({
            "message": "Forbidden request."
        })
    }

    req.user = user

    next()

}

