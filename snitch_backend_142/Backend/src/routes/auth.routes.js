import express from "express";
import { googleCallbackController, loginController, registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";
import passport from "passport";

const authRouter = express.Router()


authRouter.post("/register", registerValidation, registerController)

authRouter.post("/login", loginController)

authRouter.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
)

authRouter.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/"
    }),
    googleCallbackController
)

export default authRouter