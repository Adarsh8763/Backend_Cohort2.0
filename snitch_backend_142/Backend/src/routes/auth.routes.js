import express from "express";
import { registerController } from "../controllers/auth.controller";
import { registerValidation } from "../validation/auth.validator";

const router = express.Router()


router.post("register", registerValidation, registerController)

export default router