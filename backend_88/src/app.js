// Make a notes array where user can create notes and able to see the list of notes created using POST, GET, DELETE and PATCH

const express = require('express')
const app = express()

app.use(express.json())

let notes=[]

app.post('/notes',(req,res) => {
    notes.push(req.body)
    res.send("Notes created")
})

app.get('/notes',(req,res) => {
    res.send(notes)
})
app.delete("/notes/:index",(req,res) => {
    delete notes[req.params.index]
    res.send(notes)
})
app.patch("/notes/:index",(req,res) =>{
    notes[req.params.index].title = req.body.title
    res.send("Note updated")
})
app.put("/notes/:index",(req,res)=>{
    notes[req.params.index] = req.body
    res.send("replaced")
})
module.exports = app
