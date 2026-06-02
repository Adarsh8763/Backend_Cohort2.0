import express from "express";
import { getMeContoller, googleCallbackController, loginController, registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";
import passport from "passport";
import config from "../config/config.js";
import identifyUser from "../middlewares/auth.middleware.js";

const authRouter = express.Router()


authRouter.post("/register", registerValidation, registerController)

authRouter.post("/login", loginController)

authRouter.get("/get-me", identifyUser, getMeContoller)

authRouter.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
)

authRouter.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallbackController
)

export default authRouter