import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { createAgent, tool } from "langchain"
import * as z from "zod"
import { searchInternet } from "./internet.service.js";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0
});

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternetTool",
        description: "Use this tool to search the internet for latest information.",
        schema: z.object({
            query: z.string().describe("The search query to find relevant information on the internet.")
        })
    }
)

const agent = createAgent({
    model,
    tools: [searchInternetTool]
})

export async function generateResponse(messages) {
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are an AI assistant.

                IMPORTANT:
                - If question needs latest or real-time info → MUST use searchInternetTool
                - Do NOT answer from your own knowledge if unsure
                - Always prefer tool for current data
            `),
            ...(messages.map(msg => {
                if (msg.role === "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role === "ai") {
                    return new AIMessage(msg.content)
                }
            }))]
    })

    return response.messages[response.messages.length - 1].text
}

export async function generateChatTitle(message) {
    const response = await model.invoke([
        new SystemMessage(`
                            You generate ONLY a title.

                            STRICT RULES:
                            - Must be 2 to 4 words ONLY
                            - No extra text
                            - No explanation
                            - No punctuation like ":" or "-"
                            - Output must be plain text only

                            If rules are broken, the answer is invalid.
        `),
        new HumanMessage(message)
    ])

    return response.text
}