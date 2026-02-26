const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "Test",
        folder: "Cohort-2/insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.send(file)
}

// getPostController sends all posts created by a user to that user only
// Ek user dusra user ka posts ko access (get) nhi kr payega 
async function getPostController(req,res){
    
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        msg: "Posts fetched successfully",
        posts
    })
}

// Give details of a post if that user who created it wants the details otherwise not provide detials
async function getPostDetailsController(req,res){
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post){
        return res.status(404).json({
            msg: "Post not found"
        })
    }
    const isValidUser = userId === post.user.toString()

    if(!isValidUser){
        return res.status(403).json({
            msg: "Forbidden content"
        })
    }

    res.status(200).json({
        msg: "Post fetched successfully",
        post
    })
}

async function likeController(req,res){
    const userId = req.user.id
    const postId = req.params.postId

    const isPostIdValid = await postModel.findById(postId)
    
    if(!isPostIdValid){
        return res.status(404).json({
            msg: "Post not found"
        })
    }

    const isPostAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: userId
    })
    
    if(isPostAlreadyLiked){
        return res.status(200).json({
            msg: "Post already liked",
            like: isPostAlreadyLiked
        })
    }

    const likeRecord = await likeModel.create({
        post: postId,
        user: userId
    })

    res.status(200).json({
        msg: "Post is liked",
        like: likeRecord
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likeController
}