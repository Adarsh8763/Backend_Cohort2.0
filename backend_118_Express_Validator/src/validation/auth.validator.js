import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()){
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

export const registerValidation = [
    body("username").isString().withMessage("Username should be string"),
    body("email").isEmail().withMessage("Email should be a valid email address"),
    // body("password").isLength({ min: 6, max: 12}).withMessage("Pswd should be between 6 to 12 characters")
    body("password").custom((value) => {
        if (value.length < 6){
            throw new Error ("Pswd shuld be 6 character long")
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
        if (!passwordRegex.test(value)){
            throw new Error ("Should contian atleast one uppercase and one number")
        }
        return true
    }).withMessage("Pasword shuld be atleat 6 char long and should contain atleast one uppercase and one digit"),
    validate
] 