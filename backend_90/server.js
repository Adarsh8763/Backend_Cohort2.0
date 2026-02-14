const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://adarshkumarkamal8763_db_user:4GIaLvHNhmCY8m2n@cluster0.6ubwbqb.mongodb.net/backend_90")
        .then(()=>{
            console.log("Connected to db");
        })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server started at port 3000");
    
})