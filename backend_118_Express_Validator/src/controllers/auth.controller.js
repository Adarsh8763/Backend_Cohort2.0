function registerController(req, res, next){
    try{
        console.log(user);
        throw new Error ("Encountered an error")
    }catch(err){
        err.status = 400
        next(err)
    }
}

export default {
    registerController
}