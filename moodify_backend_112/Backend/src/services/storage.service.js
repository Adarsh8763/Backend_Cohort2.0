const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile({buffer, filename, folder}){
    const file = await imagekit.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder: folder
    })
    return file
}

module.exports = { uploadFile }