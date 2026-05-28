import express from "express";

const app = express()

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello, World!" })
    // console.log("Root endpoint was accessed")
})

app.get("/health", (req, res) => {
    return res.status(200).json({ status: "OK" })
    console.log("System health is OK")
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})