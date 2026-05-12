import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

export const registerValidation = [
    body("fullname")
        .notEmpty().withMessage("Fullname is required")
        .length({ min: 3 }).withMessage("Fullname must be at least 3 characters long"),
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be a valid 10-digit number"),
    validate
]