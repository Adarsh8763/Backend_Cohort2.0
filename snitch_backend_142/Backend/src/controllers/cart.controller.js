import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import { stockOfVariant } from "../dao/product.dao.js"
import userModel from "../models/user.model.js"
import { decode } from "jsonwebtoken"
import mongoose from "mongoose"

export async function addToCartController(req, res) {
    const decoded = req.user
    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body

    const user = await userModel.findById(decoded.id)
    console.log("heleloe", user)

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

export async function getCartController(req, res) {
    const decoded = req.user
    // console.log(decoded.id)
    const cart = (await cartModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(decoded.id)
            }
        },
        { $unwind: { path: '$items' } },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },
        { $unwind: { path: '$items.product' } },
        {
            $unwind: { path: '$items.product.variants' }
        },
        {
            $match: {
                $expr: {
                    $eq: [
                        '$items.product.variants._id',
                        '$items.variant'
                    ]
                }
            }
        },
        {
            $addFields: {
                itemPrice: {
                    $multiply: [
                        '$items.product.variants.price.amount',
                        '$items.quantity'
                    ]
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                total: { $sum: '$itemPrice' },
                currency: {
                    $first: '$items.price.currency'
                },
                items: { $push: '$items' }
            }
        }
    ]))[0]

    console.log(cart)

    if (!cart) {
        return res.status(200).json({
            "message": "No items found in cart.",
            cart
        })
    }
    return res.status(200).json({
        "message": "Cart items fetched successfully.",
        cart
    })
}

export async function incrementCartItemQuantityController(req, res) {
    const { productId, variantId } = req.params

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            "message": "Product not found.",
            success: false
        })
    }

    const cart = await cartModel.findOne({
        userId: req.user.id
    })

    if (!cart) {
        return res.status(404).json({
            "message": "Cart not found.",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId)?.quantity || 0

    if (itemQuantityInCart + 1 > stock) {
        return res.status(400).json({
            "message": `Only ${stock - itemQuantityInCart} items left in stock.`,
            success: false
        })
    }
    await cartModel.findOneAndUpdate({
        userId: req.user.id,
        "items.product": productId,
        "items.variant": variantId
    }, {
        $inc: {
            "items.$.quantity": 1
        }
    }, {
        new: true
    })

    return res.status(200).json({
        "message": "Product quantity incremented in cart successfully.",
        success: true
    })
}

export async function decrementCartItemQuantityController(req, res) {
    const { productId, variantId } = req.params

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            "message": "Product not found.",
            success: false
        })
    }

    const cart = await cartModel.findOne({
        userId: req.user.id
    })

    if (!cart) {
        return res.status(404).json({
            "message": "Cart not found.",
            success: false
        })
    }

    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId)?.quantity || 0

    if (itemQuantityInCart - 1 < 0) {
        return res.status(400).json({
            "message": `Cannot decrement quantity below 0.`,
            success: false
        })
    }
    await cartModel.findOneAndUpdate({
        userId: req.user.id,
        "items.product": productId,
        "items.variant": variantId
    }, {
        $inc: {
            "items.$.quantity": -1
        }
    }, {
        new: true
    })

    return res.status(200).json({
        "message": "Product quantity decremented in cart successfully.",
        success: true
    })
}

export async function removeItemController(req, res) {
    const decoded = req.user
    const { cartItemId } = req.params

    const cart = await cartModel.findOne({
        userId: decoded.id
    })
    
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found.",
            success: false
        })
    }

    cart.items = cart.items.filter(item => item._id.toString() !== cartItemId)
    await cart.save()

    // Populate and format the cart response
    const updatedCart = await cartModel.findOne({
        userId: decoded.id
    }).populate({
        path: 'items.product',
        select: '_id title images price variants'
    })

    if (!updatedCart || updatedCart.items.length === 0) {
        return res.status(200).json({
            message: "Item removed from cart.",
            success: true,
            cart: {
                items: [],
                total: 0,
                currency: "INR"
            }
        })
    }

    // Format the response
    let total = 0
    const currency = updatedCart.items[0]?.price?.currency || "INR"
    
    const formattedItems = updatedCart.items.map(item => {
        const product = item.product
        const variantId = item.variant.toString()
        const matchedVariant = product?.variants?.find(v => v._id.toString() === variantId)
        
        const itemTotal = (matchedVariant?.price?.amount || item.price?.amount || 0) * item.quantity
        total += itemTotal
        
        return {
            _id: item._id,
            product: product,
            variant: matchedVariant,
            quantity: item.quantity,
            price: item.price || matchedVariant?.price
        }
    })

    return res.status(200).json({
        message: "Item removed from cart.",
        success: true,
        cart: {
            items: formattedItems,
            total: total,
            currency: currency
        }
    })
}
