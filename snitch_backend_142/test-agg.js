import mongoose from 'mongoose';
import cartModel from './Backend/src/models/cart.model.js';
import dotenv from 'dotenv';
dotenv.config({ path: './Backend/.env' });

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  const carts = await cartModel.find();
  console.log("Carts in DB:", JSON.stringify(carts, null, 2));
  
  if (carts.length > 0) {
    const userId = carts[0].userId;
    console.log("Testing aggregation for user:", userId);
    
    const cart = await cartModel.aggregate([
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
                _id: '$_id', // FIXED: it was '_id' as string in controller, which means literal string '_id'!!
                total: { $sum: '$itemPrice' },
                currency: {
                    $first: '$items.price.currency'
                },
                items: { $push: '$items' }
            }
        }
    ]);
    console.log("Aggregated Cart:", JSON.stringify(cart, null, 2));
  }
  process.exit();
}
test();
