import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())

//Require Routes
import authRouter from "./routes/auth.routes.js"

//Use Routes
app.use("/api/auth", authRouter)

export default app