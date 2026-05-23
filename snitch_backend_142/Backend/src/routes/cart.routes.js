import express from "express"
import { identifyUser } from "../middlewares/auth.middleware.js"
import { addToCartController, getCartController } from "../controllers/cart.controller.js"
import { addToCartValidator } from "../validation/cart.validator.js"

const cartRouter = express.Router()

cartRouter.post("/add/:productId/:variantId", identifyUser, addToCartValidator, addToCartController)

cartRouter.get("/", identifyUser, getCartController)


export default cartRouter