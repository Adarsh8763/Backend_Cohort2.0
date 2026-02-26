const jwt = require("jsonwebtoken")

function identifyUser(req,res,next){
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

    req.user = decoded
    next()
}

module.exports = identifyUser