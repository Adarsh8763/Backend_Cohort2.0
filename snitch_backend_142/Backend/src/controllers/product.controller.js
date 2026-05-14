import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"

export async function createProductController(req, res) {
    const sellerId = req.user._id

    const { title, description, priceAmount, priceCurrency } = req.body

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const product = await productModel.create({
        title,
        description,
        seller: sellerId,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images
    })

    return res.status(201).json({
        "message": "Product created successfully",
        "status": true,
        product
    })
}