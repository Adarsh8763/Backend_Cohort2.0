import { Router } from "express";
import agent from "../agents/code.agent.js";

const agentRouter = Router()

agentRouter.post("/invoke", async (req, res) => {
    try {
        const { message } = req.body
        console.log("Agent invoke started");
        const response = await agent.invoke({
            messages: [{
                role: "user",
                content: message
            }]
        })
        console.log("Agent invoke completed");
        res.json({ response })
    } catch (err) {
        res.status(500).json({
            message: `Failed to invoke agent`,
            error: err
        })
    }
})


export default agentRouter