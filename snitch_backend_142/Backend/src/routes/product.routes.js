import express from "express"
import { identifySeller } from "../middlewares/auth.middleware.js"
import multer from "multer"
import { createProductController } from "../controllers/product.controller.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024*1024*10
    }
})

const productRouter = express.Router()

productRouter.post("/", upload.array("images", 7), identifySeller, createProductController)

export default productRouter