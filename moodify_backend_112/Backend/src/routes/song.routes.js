const express = require("express")
const upload = require("../middlewares/songUpload.middleware")
const songController = require("../controllers/songController")

const songRouter = express.Router()

// POST   /api/songs
songRouter.post("/", upload.single("song"), songController.uploadSong)

//GET /api/songs?mood=happy
songRouter.get("/", songController.getSong)


module.exports = songRouter