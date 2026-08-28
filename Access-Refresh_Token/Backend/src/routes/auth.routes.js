const express = require("express")
const { getAccessTokenController, loginController, registerContoller } = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/register", registerContoller)

authRouter.post("/login", loginController)

authRouter.get("/get-accessToken", getAccessTokenController)

module.exports = authRouter