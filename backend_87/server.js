// Make a notes array where user can create notes and able to see the list of notes created using POST and GET

const express = require('express')
const app = express()

app.use(express.json())

let notes = []

app.post('/notes',(req,res) =>{
    notes.push(req.body)
    res.send("Notes Created")
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(3000)
