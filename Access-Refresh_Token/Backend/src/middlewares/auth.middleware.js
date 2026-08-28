const userModel = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken

        if(!accessToken){
            return res.status(404).json({
                message: "Unauthorized user"
            })
        }

        let decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

        if(!decode){
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }

        const user = await userModel.findById(decode.id)

        req.user = user

        next()
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = authMiddleware