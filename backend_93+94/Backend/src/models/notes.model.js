const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const noteModel = mongoose.model("allNotes",noteSchema)

module.exports = noteModel