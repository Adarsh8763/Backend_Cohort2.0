import jwt from "jsonwebtoken"
import redis from "../config/cache.js"

async function identifyUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(404).json({
            message: "Token not provided"
        })
    }

    const isTokenBalcklisted = await redis.get(`perplexity:${token}`)
    if(isTokenBalcklisted){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    let decoded
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    req.user = decoded

    next()
}

export default identifyUser