import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/config.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.static("public"))

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (_, __ , profile, done) => {
    return done(null, profile)
}))

//Require Routes
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

//Use Routes
app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.use('*name', (req,res)=>{
    // res.send("This is wild card")
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

export default app