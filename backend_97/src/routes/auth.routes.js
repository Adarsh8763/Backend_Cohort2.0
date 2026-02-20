const express = require("express")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const userModel = require("../models/users.model")

authRouter.post("/register", async (req,res)=>{
    const {name, email, password} = req.body
    
    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            msg: "User already exists wit this email address"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("Jwt_token",token)

    res.status(201).json({
        msg: "User registered",
        user,
        token
    })
})

module.exports = authRouter