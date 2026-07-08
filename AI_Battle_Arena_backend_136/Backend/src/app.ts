import express from "express"
import useGraph from "./services/graph.ai.service.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(express.static("./public"))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.post("/use-graph", async(req, res) => {
    const result = await useGraph(req.body.problem)
    res.status(201).json({
        "message": "Graph invoked successfully",
        "result": result
    })
})

app.use('*name', (req,res)=>{
    // res.send("This is wild card")
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

export default app