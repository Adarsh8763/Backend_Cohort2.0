const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static("./public"))

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

// Require routes
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

// Using Routes
app.use("/api/auth",authRouter)
app.use("/api/post", postRouter)
app.use("/api/users", userRouter)


app.use('*name', (req,res)=>{
    // res.send("This is wild card")
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app