import express from "express"
import useGraph from "./services/graph.ai.service.js"

const app = express()

app.get("/health", (req, res) => {
    res.status(200).json({
        "status": "ok"
    })
})

app.post("/use-graph", async(req, res) => {
    const result = await useGraph("What is the capital of India?")
    res.status(201).json({
        "message": "Graph invoked successfully",
        "result": result
    })
})

export default app