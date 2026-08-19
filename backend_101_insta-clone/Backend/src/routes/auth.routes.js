const express = require("express")
const authRouter = express.Router()
const authController = require("../controller/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

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

/*
    @route - PATCH /api/auth/update-profile-img
    @description - Update the logged-in user's profile picture
    @access - protected
*/
authRouter.patch("/update-profile-img", upload.single("profileImg"), identifyUser, authController.updateProfileImgController)

module.exports = authRouter