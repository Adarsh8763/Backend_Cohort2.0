const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body, req.file)

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            msg: "Token not provided, unauthorized access"
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            msg: "User not authorized"
        })
    }
    console.log(decoded);
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "Test",
        folder: "Cohort-2/insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.send(file)
}

// getPostController sends all posts created by a user to that user only
// Ek user dusra user ka posts ko access (get) nhi kr payega 
async function getPostController(req,res){
    const token = req.cookies.token

    if (!token){
        return res.status(401).json({
            msg: "Token not provided, unauthorized access"
        })
    }

    let decoded
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        res.status(401).json({
            msg: "User not authorized"
        })
    }

    const userId = decoded.id

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
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg: "Token not provided, unauthorized access"
        })
    }

    let decoded

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            msg: "Invalid token"
        })
    }
    const userId = decoded.id
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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}