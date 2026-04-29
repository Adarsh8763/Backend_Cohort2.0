import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0
});

export async function generateResponse(messages) {
    const response = await model.invoke(messages.map(msg=>{
        if (msg.role === "user"){
            return new HumanMessage(msg.content)
        } else if(msg.role === "ai"){
            return new AIMessage(msg.content)
        }
    }))

    return response.text
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