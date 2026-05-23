import mongoose from "mongoose"
import config from "./config.js"

async function connectToDB() {
    await mongoose.connect(config.MONGO_URI)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch(() => {
            console.log("Problem connecting with DB")
        })
}

export default connectToDB