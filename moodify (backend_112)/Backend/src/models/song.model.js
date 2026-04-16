const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    songURL: {
        type: String,
        required: true
    },
    posterURL: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ["sad", "happy", "surprised"],
            msg: "Mood must be sad, happy or surprised"
        }
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel