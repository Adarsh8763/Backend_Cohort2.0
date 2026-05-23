import express from "express"
import { identifyUser } from "../middlewares/auth.middleware.js"
import { addToCartController, getCartController, incrementCartItemQuantityController, decrementCartItemQuantityController, removeItemController } from "../controllers/cart.controller.js"
import { addToCartValidator, cartItemQuantityValidator } from "../validation/cart.validator.js"

const cartRouter = express.Router()

cartRouter.post("/add/:productId/:variantId", identifyUser, addToCartValidator, addToCartController)

cartRouter.get("/", identifyUser, getCartController)

cartRouter.patch("/quantity/increment/:productId/:variantId", identifyUser, cartItemQuantityValidator, incrementCartItemQuantityController)

cartRouter.patch("/quantity/decrement/:productId/:variantId", identifyUser, cartItemQuantityValidator, decrementCartItemQuantityController)

cartRouter.delete("/item/:cartItemId", identifyUser, removeItemController)

export default cartRouter