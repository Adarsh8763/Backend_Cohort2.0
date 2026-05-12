import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";


const authRouter = express.Router()


authRouter.post("/register", registerValidation, registerController)

authRouter.post("/login", loginController)

export default authRouter