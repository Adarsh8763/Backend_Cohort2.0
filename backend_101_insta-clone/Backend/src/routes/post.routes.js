const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

/*
    @route - POST /api/post 
    @description - Create a new post with an image
    @access - protected
*/
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

/*
    @route - GET /api/post
    @description - Get all posts for a user
    @access - protected
*/
postRouter.get("/",identifyUser, postController.getPostController)


/*
    @route - GET /api/post/details/:postId
    @description - Get details of a specific post
    @access - protected
*/
postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)

/*
    @route - POST /api/post/like/:postId 
    @description - Like a specific post
    @access - protected
*/
postRouter.post("/like/:postId", identifyUser, postController.likeController)

module.exports = postRouter

