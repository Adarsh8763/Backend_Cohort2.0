import { body, validationResult } from "express-validator"

const validate = (req,res,next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

export const registerValidation = [
    body("username").isString().withMessage("Username must be a string"),
    body("email").isEmail().withMessage("Email should be a valid email address"),
    body("password").custom((value) => {
        if (value.length < 6)
            throw new Error("Password should be atleaast 6 chararcter long")

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
        if(!passwordRegex.test(value)){
            throw new Error ("Should contain atleast 1 uppercase and one digit")
        }
        return true
    }),
    validate
]