import express from "express"
import useGraph from "./services/graph.ai.service.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.post("/use-graph", async(req, res) => {
    const result = await useGraph(req.body.problem)
    res.status(201).json({
        "message": "Graph invoked successfully",
        "result": result
    })
})

export default app