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
        fileName: "Test"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.send(file)
}

module.exports = {
    createPostController
}