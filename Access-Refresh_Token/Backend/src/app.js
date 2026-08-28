const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

//Routes
const authRouter = require("./routes/auth.routes")
const homeRouter = require("./routes/home.routes")

app.use("/api/auth", authRouter)
app.use("/api/home", homeRouter)

module.exports = app;



