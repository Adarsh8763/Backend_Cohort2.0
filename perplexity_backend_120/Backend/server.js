import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";
// import { testAi } from "./src/services/ai.service.js";

const httpServer = http.createServer(app)

initSocket(httpServer)

connectToDB()

// testAi()

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})