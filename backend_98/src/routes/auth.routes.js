const  express = require("express")
const authRouter =  express.Router()
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken") 
const crypto = require("crypto")

authRouter.post("/register", async (req,res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if (isUserAlreadyExists){
        return res.status(409).json({
            msg: "User already exists with this email account"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    
    const user = await userModel.create({
        name, email, password: hash
    })
    
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_token", token)

    res.status(201).json({
        msg: "User registered",
        user,
        token
    })
})

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        msg: "This is a protected route"
    })
})

authRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if (!user){
        return res.status(404).json({
            msg: "User not found with this account"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatched){
        return res.status(401).json({
            msg: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_token", token)

    res.status(200).json({
        msg: "User logged in ",
        user
    })

})

module.exports = authRouter