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
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    // Find all products to see variants structure
    const products = await productModel.find();
    console.log("Sample product variants:", products.length ? products[0].variants : "No products");

    const carts = await cartModel.find();
    console.log("Carts in DB count:", carts.length);
    if (carts.length > 0) {
      console.log("Sample Cart items:", carts[0].items);
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
                  _id: '$_id', // Fixed grouping
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
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}
test();
