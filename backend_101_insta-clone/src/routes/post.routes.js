const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

/*
    @route - POST /api/post [protected]
    @description - Create a new post with an image
*/
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

/*
    @route - GET /api/post [protected]
    @description - Get all posts for a user
*/
postRouter.get("/",identifyUser, postController.getPostController)


/*
    @route - GET /api/post/details/:postId [protected]
    @description - Get details of a specific post
*/
postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)

/*
    @route - POST /api/post/like/:postId [protected]
    @description - Like a specific post
*/
postRouter.post("/like/:postId", identifyUser, postController.likeController)

module.exports = postRouter

