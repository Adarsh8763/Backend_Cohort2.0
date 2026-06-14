import { Router } from "express";
import agent from "../agents/code.agent.js";

const agentRouter = Router()

/*
Streaming only means data comes in small pieces instead of all at once.
SSE = a method that helps the browser receive those small pieces one by one and process them as they arrive.

In streaming, the writer(written inside tools.js) is the thing that actually sends each piece of data into the stream.
*/

agentRouter.post("/invoke", async (req, res) => {
    try {
        const { message, projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({ error: "projectId is required" });
        }

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const writer = (text) => {
            res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
        };

        console.log("🚀 Agent invoke started");

        // Add timeout - 5 minutes max
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Agent execution timeout")), 900000)
        );

        const response = await Promise.race([
            agent.stream(
                { messages: [{ role: "user", content: message }] },
                { configurable: { projectId, writer } }
            ),
            timeoutPromise
        ]);

        for await (const chunk of response) {
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }

        console.log("✓ Agent invoke completed");
        res.end();
    } catch (err) {
        console.error("❌ Agent error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: err.message });
        } else {
            res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
            res.end();
        }
    }
});

export default agentRouter;