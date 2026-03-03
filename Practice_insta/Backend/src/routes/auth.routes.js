const express = require("express")
const authRouter = express.Router()
const authController = require("../controller/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

/*
    @route - POST /api/auth/register
    @description - Register a new user
    @access - public
*/
authRouter.post("/register", authController.registerController )

/*
    @route - POST /api/auth/login
    @description - Login a user
    @access - public
*/
authRouter.post("/login", authController.loginController)

/*
    @route - GET /api/auth/get-me
    @description - Get details of logged in user
    @access - protected
*/
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter