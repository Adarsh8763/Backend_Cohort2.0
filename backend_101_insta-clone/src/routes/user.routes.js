const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const userController = require("../controller/user.controller")

const userRouter = express.Router()

/*
* @route - POST/api/users/follow/:username
* @description - Follow a user
* @access - protected
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/*
* @route - POST/api/users/unfollow/:username
* @description - Unfollow a user
* @access - protected
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowController)

module.exports = userRouter 