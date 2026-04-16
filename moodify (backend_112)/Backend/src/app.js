const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Require Routes
const authRouter = require("./routes/auth.routes")
const songRouter = require("./routes/song.routes")


//Use Routes
app.use("/api/auth", authRouter)
app.use("/api/songs", songRouter)

module.exports = app