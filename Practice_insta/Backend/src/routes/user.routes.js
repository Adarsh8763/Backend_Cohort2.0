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

/*
* @route - POST/api/users/accept/:requestId (Sent by followee) (Here requestId is the id of document that is created when a follow req is sent by follower to followee)
* @description - Accept a follow request 
* @access - protected
 */
userRouter.patch("/accept/:requestId", identifyUser, userController.acceptController)

/*
* @route - POST/api/users/reject/:requestId (Sent by followee) (Here requestId is the id of document that is created when a follow req is sent by follower to followee)
* @description - Reject a follow request 
* @access - protected
 */
userRouter.patch("/reject/:requestId", identifyUser, userController.rejectController)

module.exports = userRouter 