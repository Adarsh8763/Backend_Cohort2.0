import express from "express";
import authController from "../controllers/auth.controller.js"
import identifyUser from "../middlewares/auth.middleware.js";
import { registerValidation } from "../validation/auth.validator.js";

const authRouter = express.Router()

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// @body    { username, email, password }
authRouter.post("/register", registerValidation, authController.registerController)

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// @body    { email, password }
authRouter.post("/login", authController.loginController)

// @desc    Get current user
// @route   GET /api/auth/get-me
// @access  Private
authRouter.get("/get-me", identifyUser, authController.getMeController)

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
authRouter.post("/logout", identifyUser, authController.logoutController)

// @desc    Verify email
// @route   GET /api/auth/verify-email
// @access  Public
// @query   token
authRouter.get("/verify-email", authController.verifyEmailController)

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification-email
// @access  Public
// @query   email
authRouter.post("/resend-verification-email", authController.resendVerificationEmailController)

export default authRouter