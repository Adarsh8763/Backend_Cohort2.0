import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import { stockOfVariant } from "../dao/product.dao.js"
import userModel from "../models/user.model.js"

export async function addToCartController(req, res) {
    const decoded = req.user
    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body
    
    const user = await userModel.findById(decoded.id)
    console.log("heleloe",user)

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            "message": "Product or variant not found.",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cart = await cartModel.findOne({
        userId: user._id
    }) || await cartModel.create({
        userId: user._id,
        items: []
    })

    const isProductAlredyExistsInCart = cart.items.some(item => item.product.toString() === productId && item.variant.toString() === variantId)

    if (isProductAlredyExistsInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId).quantity

        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                "message": `Only ${stock - quantityInCart} items left in stock.`,
                success: false
            })
        }
        await cartModel.findOneAndUpdate({
            userId: user._id,
            "items.product": productId,
            "items.variant": variantId
        }, {
            $inc: {
                "items.$.quantity": quantity
            }
        }, {
            new: true
        })

        return res.status(200).json({
            "message": "Product quantity updated in cart successfully.",
            success: true
        })
    }
    if (quantity > stock) {
        return res.status(400).json({
            "message": `Only ${stock} items left in stock.`,
            success: false
        })
    }
    
    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: {
            amount: product.variants.find(variant => variant._id.toString() === variantId).price.amount,
            currency: product.variants.find(variant => variant._id.toString() === variantId).price.currency
        }
    })

    await cart.save()
    
    return res.status(200).json({
        "message": "Product added to cart successfully.",
        success: true
    })
}
    
