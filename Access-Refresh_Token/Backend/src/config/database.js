const mongoose = require("mongoose")

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log("Error connecting in DB", err)
    }
}

module.exports = connectToDB