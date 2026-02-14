const mongoose = require("mongoose")

function connectToDb(){
    console.log(process.env.MONGO_URI);
    
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to db");
        })
}
module.exports = connectToDb