import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

export const createProductValidation = [
    body("title")
        .notEmpty().withMessage("Title is required"),
    body("description")
        .notEmpty().withMessage("Description is required"),
    body("priceAmount")
        .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("priceCurrency")
        .notEmpty().withMessage("Price currency is required"),
    validate
]