import express from "express"
import { identifySeller } from "../middlewares/auth.middleware.js"
import multer from "multer"
import { createProductController, getAllProductsController, getSellerProductsContoller, getProductDetailsController, addProductVariant } from "../controllers/product.controller.js"
import { createProductValidator } from "../validation/product.validator.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024*1024*10
    }
})

const productRouter = express.Router()

productRouter.post("/", identifySeller, upload.array("images", 7), createProductValidator, createProductController)

productRouter.get("/seller", identifySeller, getSellerProductsContoller)

productRouter.get("/", getAllProductsController)

productRouter.get("/details/:productId", getProductDetailsController)

productRouter.post("/:productId/variants", identifySeller, upload.array("images",7), addProductVariant)

export default productRouter