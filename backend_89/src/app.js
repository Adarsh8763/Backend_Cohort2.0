const express = require('express')
const app = express()

app.use(express.json())

notes=[]

app.post('/notes',(req,res) => {
    notes.push(req.body)
    res.status(201).json({
        msg: "Note created successfully"
    })
})

app.get('/notes',(req,res)=> {
    res.status(200).json({
        notes: notes
    })
})

app.delete('/notes/:index',(req,res) => {
    delete notes[req.params.index]
    res.status(204).json({
        msg: "Note deleted succesfully"
    })
})

app.patch('/notes/:index',(req,res) => {
    notes[req.params.index].description = req.body.description
    res.status(200).json({
        msg: "Note has been updated successfully"
    })
})

module.exports = app