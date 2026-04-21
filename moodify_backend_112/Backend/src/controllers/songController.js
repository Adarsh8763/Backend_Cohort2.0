const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")


async function uploadSong(req,res){
    const songBuffer = req.file.buffer
    const { mood } = req.body
    
    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + '.mp3',
            folder: "/Cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/Cohort-2/moodify/posters"
        })
    ])
    // console.log(songFile)

    const song = await songModel.create({
        title: tags.title,
        songURL: songFile.url,
        posterURL: posterFile.url,
        mood
    })

    res.status(201).json({
        msg: "Song created successfully",
        song
    })
}

async function getSong(req,res){

    // console.log("Query:", req.query);
    const { mood } = req.query

    const song = await songModel.findOne({
        mood
    })
    // console.log("Any song:", song);

    res.status(200).json({
        msg: "Song fetched successfully",
        song
    })
}


module.exports = {
    uploadSong,
    getSong
}