import mongoose from 'mongoose';
import cartModel from './src/models/cart.model.js';
import productModel from './src/models/product.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Find all products to see variants structure
    const products = await productModel.find();
    console.log("Sample product variants:", products.length ? products[0].variants : "No products");

    const carts = await cartModel.find();
    console.log("Carts in DB count:", carts.length);
    if (carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        const userId = carts[i].userId;
        const rawItemsCount = carts[i].items.length;
        console.log(`\nTesting cart ${i} (User: ${userId}) - Raw items count: ${rawItemsCount}`);
        
        if (rawItemsCount === 0) {
            console.log("Cart is empty in DB. Pipeline will naturally drop it.");
            continue;
        }

        const cart = await cartModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            { $unwind: { path: '$items' } },
            {
                $addFields: {
                    'items.product': { $toObjectId: '$items.product' },
                    'items.variant': { $toString: '$items.variant' }
                }
            },
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
                            { $toString: '$items.product.variants._id' },
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
        ]);
        
        if (cart.length === 0) {
            console.log("ERROR: Aggregation pipeline DROPPED the cart completely!");
        } else {
            console.log(`Aggregation returned cart with ${cart[0].items.length} items.`);
            if (cart[0].items.length < rawItemsCount) {
                console.log(`WARNING: Pipeline dropped ${rawItemsCount - cart[0].items.length} items!`);
            }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}
test();
