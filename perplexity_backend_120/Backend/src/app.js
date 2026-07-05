import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.static("./public"))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Require Routes
import authRouter from "./routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"

//Use Routes
app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)

app.use('*name', (req,res)=>{
    // res.send("This is wild card")
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

export default app