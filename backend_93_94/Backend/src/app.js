const express = require("express")
const app = express()
const noteModel = require("./models/notes.model")
const cors =require("cors")
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        msg: "Note created successfully",
        note
    })
})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        msg: "Notes fetched successfully",
        notes
    })
})

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        msg: "Note deleted succesfully",
    })
})

app.patch("/api/notes/:id", async(req, res) => {
    const id = req.params.id
    const {description} = req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        msg: "Note updated successfully"
    })
})
// console.log(__dirname);

app.use("*name",(req,res)=>{
    res.send("This is wild card")
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app