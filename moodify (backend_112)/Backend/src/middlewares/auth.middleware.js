const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

async function identifyUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(404).json({
            msg: "Token not provided"
        })
    }

    const isTokenBlacklist = await blacklistModel.findOne({
        token: token
    })

    if(isTokenBlacklist){
        return res.status(401).json({
            msg: "Invalid Token"
        })
    }

    let decoded
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            msg: "Unauthorized access"
        })
    }

    req.user = decoded
    next()
}

module.exports = identifyUser