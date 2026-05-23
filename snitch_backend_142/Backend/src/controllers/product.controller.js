import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"

export async function createProductController(req, res) {
    const sellerId = req.user._id

    const { title, description, priceAmount, priceCurrency, stock } = req.body
    const attributes = JSON.parse(req.body.attributes || "{}")

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const variants = [
        {
            images,
            stock,
            attributes,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR"
            }
        }
    ]

    const product = await productModel.create({
        title,
        description,
        seller: sellerId,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        variants
    })

    return res.status(201).json({
        "message": "Product created successfully",
        "status": true,
        product
    })
}

export async function getSellerProductsContoller(req, res) {
    const seller = req.user

    const products = await productModel.find({
        seller: seller._id
    })

    if (products.length === 0) {
        return res.status(404).json({
            "message": "No Product found."
        })
    }

    return res.status(200).json({
        "message": "Products fetched successfully.",
        products
    })

}

export async function getAllProductsController(req, res) {
    const products = await productModel.find()

    if (products.length === 0) {
        return res.status(404).json({
            "message": "No products found."
        })
    }

    return res.status(200).json({
        "message": "Products fetched successfully.",
        products
    })
}

export async function searchProductsController(req, res) {

    const { search } = req.query

    const products = await productModel.find({
        $or: [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ]
    })

    return res.status(200).json({
        message: "Products fetched successfully.",
        products
    })
}

export async function getProductDetailsController(req, res) {
    const { productId } = req.params

    const product = await productModel.findById(productId)

    if (!product) {
        return res.status(404).json({
            "message": "Product not found."
        })
    }
    return res.status(200).json({
        "message": "Product details fetched successfully.",
        product
    })
}

export async function addProductVariantController(req, res) {

    const sellerId = req.user._id

    const productId = req.params.productId
    const product = await productModel.findOne({
        _id: productId,
        seller: sellerId
    })

    if (!product) {
        return res.status(404).json({
            "message": "Product not found."
        })
    }

    const files = req.files
    const images = []
    if (files || files.length !== 0) {
        (await Promise.all(files.map(async (file) => {
            let image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }

    const priceAmount = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    // console.log(images, priceAmount, stock, attributes)

    product.variants.push({
        images,
        stock,
        attributes,
        price: {
            amount: priceAmount,
            currency: req.body.priceCurrency || product.price.currency
        }
    })

    await product.save()
    console.log(product + "heleloeo")

    return res.status(200).json({
        "message": "Product variant added successfully.",
        success: true,
        product
    })
}

export async function productRecommendationController(req, res) {

    const {productId} = req.params

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            "message": "Product not found.",
        })
    }

    const products = await productModel.find({
        _id: { $ne: productId},
        $text: {
            $search: product.title
        }
    })

    if(products.length === 0) {
        return res.status(404).json({
            "message": "No product found for recommendation."
        })
    }
    
    return res.status(200).json({
        "message": "Product recommendations fetched successfully.",
        products
    })
}
