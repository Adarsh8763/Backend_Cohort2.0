import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Require Routes
import authRouter from "./routes/auth.routes.js"

//Use Routes
app.use("/api/auth", authRouter)

export default app