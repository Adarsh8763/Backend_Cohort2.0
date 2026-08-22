const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")

const homeRouter = express.Router()

homeRouter.get("/", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Home fetched successfully"
    })
})

module.exports = homeRouter