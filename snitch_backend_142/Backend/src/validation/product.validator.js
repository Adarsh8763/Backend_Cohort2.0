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

export const createProductValidator = [
    body("title")
        .notEmpty().withMessage("Title is required"),
    body("description")
        .notEmpty().withMessage("Description is required"),
    body("priceAmount")
        .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("priceCurrency")
        .notEmpty().withMessage("Price currency is required"),
    body("stock")
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    validate
]

export const createVariantValidator = [
    body("stock")
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("priceAmount")
        .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("priceCurrency")
        .notEmpty().withMessage("Price currency is required"),
    validate
]