import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";


const router = express.Router()


router.post("register", registerValidation, registerController)

export default router