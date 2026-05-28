import app from "./src/app.js";
import connectToDB from "./src/config/database.js";


async function startServer(){
    await connectToDB()

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}
 startServer()