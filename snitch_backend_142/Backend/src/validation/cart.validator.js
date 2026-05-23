import { body, validationResult, param } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(400).json({
        errors: errors.array()
    });
}

export const addToCartValidator = [
    param("productId")
        .isMongoId().withMessage("Invalid product ID"),
    param("variantId")
        .isMongoId().withMessage("Invalid variant ID"),
    body("quantity")
        .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"),
    validate
];

export const cartItemQuantityValidator = [
    param("productId")
        .isMongoId().withMessage("Invalid product ID"),
    param("variantId")
        .isMongoId().withMessage("Invalid variant ID"),
    validate
]