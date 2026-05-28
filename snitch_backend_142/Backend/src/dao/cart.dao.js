import cartModel from "../models/cart.model.js"
import mongoose from "mongoose"

async function getCartDetails(userId){
    const cart = (await cartModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
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

    return cart
}

export default getCartDetails